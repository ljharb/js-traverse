module.exports = Hash;
var Traverse = require('traverse');

function Hash (ref) {
    var hash = Traverse.clone(ref);
    var self = {
        map : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                acc[key] = f.call(hash, hash[key], key);
            });
            return Hash(acc);
        },
        forEach : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                f.call(hash, hash[key], key);
            });
            return Hash(hash);
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
    return Hash(ref).map(f).end;
};

Hash.filter = function (ref, f) {
    return Hash(ref).filter(f).end;
};

Hash.reduce = function (ref, f, acc) {
    return Hash(ref).reduce(f, acc);
};

