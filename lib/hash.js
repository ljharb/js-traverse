module.exports = Hash;
var Traverse = require('traverse');

function Hash (hash, extra) {
    if (extra == 'clone') { // deep copy
        hash = Traverse.clone(hash);
    }
    else if (extra == 'copy') {
        var acc = { __proto__ : hash.__proto__ };
        Object.keys(hash).forEach(function (key) {
            acc[key] = hash[key];
        });
        hash = acc;
    }
    
    var self = {
        map : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                acc[key] = f.call(hash, hash[key], key);
            });
            return Hash(acc);
        },
        forEach : function (f) {
            Object.keys(hash).forEach(function (key) {
                f.call(hash, hash[key], key);
            });
            return self;
        },
        filter : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                if (f.call(hash, hash[key], key)) {
                    acc[key] = hash[key];
                }
            });
            return Hash(acc);
        },
        reduce : function (f, acc) {
            var keys = Object.keys(hash);
            if (acc === undefined) acc = keys.shift();
            keys.forEach(function (key) {
                acc = f.call(hash, acc, hash[key], key);
            });
            return acc;
        },
        update : function (h) {
            Object.keys(h).forEach(function (key) {
                hash[key] = h[key];
            });
            return self;
        },
        merge : function (h) {
            var acc = {};
            Object.keys(hash).forEach(function (key) {
                acc[key] = hash[key];
            });
            Object.keys(h).forEach(function (key) {
                acc[key] = h[key];
            });
            hash = acc;
            return self;
        },
        tap : function (f) { f.call(self, hash) },
        end : hash,
        items : hash
    };
    
    Object.defineProperty(self, 'keys', { get : function () {
        return Object.keys(hash);
    } });
    
    Object.defineProperty(self, 'values', { get : function () {
        return Object.keys(hash)
            .map(function (key) { return hash[key] })
    } });
    
    return self;
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
    return hash;
};

