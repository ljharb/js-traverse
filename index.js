module.exports = Traverse;
function Traverse (obj) {
    if (!(this instanceof Traverse)) return new Traverse(obj);
    this.value = obj;
}

Traverse.prototype.map = function (cb) {
    var obj = Traverse.clone(this.value);
    walk(obj, cb);
    return obj;
};

Traverse.prototype.forEach = function (cb) {
    walk(this.value, cb);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    // clone refObj for a properly immutable interface:
    var refs = [];
    var nodes = [];
    
    return (function clone (ref) {
        if (typeof ref == 'object' && ref !== null) {
            var node = Array.isArray(ref) ? [] : {};
            refs.push(ref);
            nodes.push(node);
            
            Object.keys(ref).forEach(function (key) {
                var i = refs.indexOf(ref[key]);
                if (i >= 0) {
                    node[key] = nodes[i];
                }
                else {
                    node[key] = clone(ref[key]);
                }
                
            });
            
            refs.pop();
            nodes.pop();
            
            // To make instanceof work:
            if (!Array.isArray(ref)) node.__proto__ = ref.__proto__;
            
            // Probably there are other attributes worth copying
            return node;
        }
        else {
            return ref;
        }
    })(this.value);
};

function walk (root, cb) {
    var path = [];
    var parents = [];
    
    return (function walker (node) {
        var modifiers = {};
        
        var state = {
            node : node,
            path : [].concat(path),
            parent : parents.slice(-1)[0],
            key : path.slice(-1)[0],
            isRoot : node === root,
            level : path.length,
            circular : null,
            update : function (x) {
                if (state.isRoot) {
                    root = x;
                }
                else {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
            },
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f }
        };
        
        if (typeof node == 'object' && node !== null) {
            state.isLeaf = Object.keys(node).length == 0
            
            for (var i = 0; i < parents.length; i++) {
                if (parents[i].node === node) {
                    state.circular = parents[i];
                    break;
                }
            }
        }
        else {
            state.isLeaf = true;
        }
        
        state.notLeaf = !state.isLeaf;
        state.notRoot = !state.isRoot;
        
        // use return values to update if defined
        var ret = cb.call(state, node);
        if (ret !== undefined && state.update) state.update(ret);
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            var keys = Object.keys(state.node);
            keys.forEach(function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                child.isLast = i == keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root);
}

Object.keys(Traverse.prototype).forEach(function (key) {
    Traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = Traverse(obj);
        return t[key].apply(t, args);
    };
});
