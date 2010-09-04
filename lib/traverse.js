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
    this.value = clone(refObj);
    
    // get() is deprecated, use .value
    this.get = function () { return this.value };
    
    this.map = function (cb) {
        var self = this;
        
        var path = [];
        var parents = [];
        walk(this.value);
        return this;
        
        function walk (node) {
            var before = null;
            var after = null;
            var between = null;
            
            var state = {
                node : node,
                path : [].concat(path),
                parent : parents.slice(-1)[0],
                key : path.slice(-1)[0],
                isRoot : node === self.value,
                level : path.length,
                circular : null,
                update : function (x) {
                    if (state.isRoot) {
                        self.value = x;
                    }
                    else {
                        state.parent.node[state.key] = x;
                    }
                    state.node = x;
                },
                before : function (f) { before = f },
                after : function (f) { after = f },
                between : function (f, acc) {
                    between = f;
                    between._acc = acc;
                }
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
            
            if (before) before.call(state, node);
            
            // use return values to update if defined
            var ret = cb.call(state, node);
            if (ret !== undefined && state.update) state.update(ret);
            
            if (typeof state.node == 'object'
            && state.node !== null && !state.circular) {
                parents.push(state);
                Object.keys(state.node).forEach(function (key, i) {
                    path.push(key);
                    walk(state.node[key]);
                    
                    if (i == 0 && between && between._acc === undefined) {
                        between._acc = state.node[key]
                    }
                    else if (between) {
                        between._acc = between.call(
                            state, between._acc, state.node[key]
                        );
                    }
                    
                    path.pop();
                });
                parents.pop();
            }
            
            if (after) after.call(state, node);
        }
    };
    
    this.modify = this.map; // deprecated .modify()
    
    this.forEach = function (f) {
        this.map(function (node) {
            delete this.update;
            f.call(this,node);
        },null);
        return this;
    };
    
    this.paths = function () {
        var acc = [];
        this.forEach(function (x) {
            acc.push(this.path); 
        });
        return acc;
    };
    
    this.nodes = function () {
        var acc = [];
        this.forEach(function (x) {
            acc.push(this.node);
        });
        return acc;
    };
}

Traverse.clone = function (obj) {
    return Traverse(obj).get();
};

Traverse.map = function (obj, f) {
    return Traverse(obj).map(f).get();
};

Traverse.forEach = function (obj, f) {
    Traverse(obj).forEach(f);
};

Traverse.paths = function (obj) {
    return Traverse(obj).paths();
};

Traverse.nodes = function (obj) {
    return Traverse(obj).nodes();
};
