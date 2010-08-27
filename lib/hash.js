module.exports = Hash;
var Traverse = require('traverse');

function Hash (hash, extra) {
    var self = {
        map : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                acc[key] = f.call(self, hash[key], key);
            });
            return Hash(acc);
        },
        forEach : function (f) {
            Object.keys(hash).forEach(function (key) {
                f.call(self, hash[key], key);
            });
            memoized = {};
            return self;
        },
        filter : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                if (f.call(self, hash[key], key)) {
                    acc[key] = hash[key];
                }
            });
            return Hash(acc);
        },
        reduce : function (f, acc) {
            var keys = Object.keys(hash);
            if (acc === undefined) acc = keys.shift();
            keys.forEach(function (key) {
                acc = f.call(self, acc, hash[key], key);
            });
            return acc;
        },
        some : function (f) {
            for (var key in hash) {
                if (f.call(self, hash[key], key)) return true;
            }
            return false;
        },
        update : function (h) {
            Object.keys(h).forEach(function (key) {
                hash[key] = h[key];
            });
            memoized = {};
            return self;
        },
        merge : function (h) {
            return self.copy.update(h);
        },
        valuesAt : function (keys) {
            return keys.map(function (key) { return hash[key] });
        },
        tap : function (f) {
            f.call(self, hash);
            memoized = {};
            return self;
        },
        extract : function (keys) {
            var acc = {};
            keys.forEach(function (key) {
                acc[key] = hash[key];
            });
            return Hash(acc);
        },
        end : hash,
        items : hash
    };
    
    var memoized = {};
    Object.defineProperty(self, 'keys', { get : function () {
        if (memoized.keys === undefined) {
            memoized.keys = Object.keys(hash);
        }
        return memoized.keys
    } });
    
    Object.defineProperty(self, 'values', { get : function () {
        if (memoized.values === undefined) {
            memoized.values = Object.keys(hash)
                .map(function (key) { return hash[key] });
        }
        return memoized.values;
    } });
    
    Object.defineProperty(self, 'clone', { get : function () {
        return Hash(Hash.clone(hash));
    } });
    
    Object.defineProperty(self, 'copy', { get : function () {
        return Hash(Hash.copy(hash));
    } });
    
    Object.defineProperty(self, 'length', { get : function () {
        if (memoized.length === undefined) {
            memoized.length = Object.keys(hash).length;
        }
        return memoized.length;
    } });
    
    return self;
};

// deep copy
Hash.clone = function (ref) {
    return Traverse.clone(ref);
};

// shallow copy
Hash.copy = function (ref) {
    var hash = { __proto__ : ref.__proto__ };
    Object.keys(ref).forEach(function (key) {
        hash[key] = ref[key];
    });
    return hash;
};

Hash.map = function (ref, f) {
    return Hash(ref).map(f).items;
};

Hash.filter = function (ref, f) {
    return Hash(ref).filter(f).items;
};

Hash.reduce = function (ref, f, acc) {
    return Hash(ref).reduce(f, acc);
};

Hash.concat = function (xs) {
    var hash = Hash({});
    xs.forEach(function (x) { hash.update(x) });
    return hash.items;
};

