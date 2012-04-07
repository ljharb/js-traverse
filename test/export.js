var assert = require('assert');
var Traverse = require('../');

exports['the export is the constructor'] = function () {
    var obj = { a : [ 1 ] };

    var called = Traverse(obj);
    assert.ok(called instanceof Traverse);
    assert.equal(called.value, obj);

    var constructed = new Traverse(obj);
    assert.ok(constructed instanceof Traverse);
    assert.equal(constructed.value, obj);
};

exports['methods added to the prototype are available'] = function () {
    Traverse.prototype.leafCount = function () {
        return this.reduce(function (acc) {
            return this.isLeaf ? acc + 1 : acc;
        }, 0);
    };
    try {
        assert.equal(Traverse({ a : [ 1, 2 ], b : 3 }).leafCount(), 3);
        assert.equal(new Traverse([ 1 ]).leafCount(), 1);
    }
    finally {
        delete Traverse.prototype.leafCount;
    }
};

exports['every method has a static form'] = function () {
    var names = [
        'get', 'set', 'map', 'forEach',
        'reduce', 'paths', 'nodes', 'clone'
    ];
    names.forEach(function (name) {
        assert.equal(typeof Traverse.prototype[name], 'function', name);
        assert.equal(typeof Traverse[name], 'function', name);
    });
    Object.keys(Traverse.prototype).forEach(function (name) {
        assert.equal(typeof Traverse[name], 'function', name);
    });

    var obj = { a : { b : 1 } };
    assert.equal(Traverse.get(obj, [ 'a', 'b' ]), 1);
    assert.equal(Traverse.set(obj, [ 'a', 'c' ], 2), 2);
    assert.equal(obj.a.c, 2);
    assert.deepEqual(Traverse.paths(obj), [ [], [ 'a' ], [ 'a', 'b' ], [ 'a', 'c' ] ]);
    assert.deepEqual(Traverse.nodes(obj), [ obj, obj.a, 1, 2 ]);
    assert.deepEqual(Traverse.clone(obj), obj);
    assert.ok(Traverse.clone(obj) !== obj);
    assert.equal(Traverse.reduce(obj, function (acc, x) {
        return this.isLeaf ? acc + x : acc;
    }, 0), 3);
};
