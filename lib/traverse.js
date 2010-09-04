module.exports = Traverse;
module.exports.Traverse = Traverse;

var sys = require('sys');

function Traverse (refObj) {
    if (!(this instanceof Traverse)) return new Traverse(refObj);
    
    // clone refObj for a properly immutable interface:
    clone.refs = [];
    clone.nodes = [];
    function clone(ref) {
        if (typeof ref == 'object' && ref !== null) {
            var node = ref instanceof Array ? [] : {};
            clone.refs.push(ref);
            clone.nodes.push(node);
            
            Object.keys(ref).forEach(function (key) {
                var i = clone.refs.indexOf(ref[key]);
                if (i >= 0) {
                    node[key] = clone.nodes[i];
                }
                else {
                    node[key] = clone(ref[key]);
                }
                
            });
            
            clone.refs.pop();
            clone.nodes.pop();
            
            // To make instanceof work:
            node.__proto__ = ref.__proto__;
            // Probably there are other attributes worth copying
            return node;
        }
        else {
            return ref;
        }
    }
    var obj = clone(refObj);
    
    this.get = function () { return obj };
    
    this.modify = function (f) {
        var path = [];
        var parents = [];
        walk(obj);
        return this;
        
        function walk (node) {
            var state = {
                node : node,
                path : [].concat(path),
                parent : parents.slice(-1)[0],
                key : path.slice(-1)[0],
                isRoot : node == obj,
                update : function (x) {
                    if (state.isRoot) {
                        obj = x;
                    }
                    else {
                        state.parent.node[state.key] = x;
                    }
                    state.node = x;
                },
                level : path.length,
                circular : null
            };
            
            if (typeof node == 'object' && node !== null) {
                state.isLeaf = Object.keys(node).length == 0
                var circs = parents.filter(function (p) {
                    return node == p.node
                });
                if (circs.length) state.circular = circs[0];
            }
            else {
                state.isLeaf = true;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
            
            f.call(state, node);
            if (typeof state.node == 'object'
            && state.node !== null && !state.circular) {
                parents.push(state);
                Object.keys(state.node).forEach(function (key) {
                    path.push(key);
                    walk(state.node[key]);
                    path.pop();
                });
                parents.pop();
            }
        }
    };
    
    this.forEach = function (f) {
        this.modify(function (node) {
            delete this.update;
            f.call(this,node);
        },null);
        return this;
    };
    
    this.paths = function () {
        var acc = [];
        this.each(function (x) {
            acc.push(this.path); 
        });
        return acc;
    };
    
    this.nodes = function () {
        var acc = [];
        this.each(function (x) {
            acc.push(this.node);
        });
        return acc;
    };
}

Traverse.clone = function (obj) {
    return Traverse(obj).get();
};

