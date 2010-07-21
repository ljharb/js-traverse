module.exports = Traverse;
module.exports.Traverse = Traverse;

function Traverse (obj) {
    if (!(this instanceof Traverse)) return new Traverse(obj);
    
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
            };
            if (typeof(node) == 'object' && node !== null) {
                state.isLeaf = Object.keys(node).length == 0
            }
            else {
                state.isLeaf = true;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
            
            f.call(state, node);
            if (typeof(state.node) == 'object' && state.node !== null) {
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
