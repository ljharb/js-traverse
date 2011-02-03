module.exports = Traverse;
module.exports.Traverse = Traverse;

function Traverse (refObj) {
    if (!(this instanceof Traverse)) return new Traverse(refObj);
    
    // clone refObj for a properly immutable interface:
    clone.refs = [];
    clone.nodes = [];
    function clone(ref) {
        if (typeof ref == 'object' && ref !== null) {
            var node = Array.isArray(ref) ? [] : {};
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
            if (!Array.isArray(ref)) node.__proto__ = ref.__proto__;
            
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
        walk({
            node : this.value,
            root : this.value,
            callback : cb
        });
        return this;
        
    };
    
    this.modify = this.map; // deprecated .modify()
    
    this.forEach = function (f) {
        this.map(function (node) {
            delete this.update;
            f.call(this, node);
        });
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

function walk (params) {
    var node = params.node;
    var root = params.root;
    var path = params.path || [];
    var parents = params.parents || [];
    var cb = params.callback;
    
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
            
            var child = walk({
                node : state.node[key],
                root : root,
                path : path,
                parents : parents,
                callback : cb
            });
            child.isLast = i == keys.length - 1;
            child.isFirst = i == 0;
            
            if (modifiers.post) modifiers.post.call(state, child);
            
            path.pop();
        });
        parents.pop();
    }
    
    if (modifiers.after) modifiers.after.call(state, state.node);
    
    return state;
}
