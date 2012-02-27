var assert = require('assert');
var Traverse = require('../');

exports['traverse an Error'] = function () {
    var obj = new Error("test");

    var results = Traverse(obj).map(function (node) { });

    assert.ok(results instanceof Error);
    assert.equal(Object.getPrototypeOf(results), Error.prototype);
    assert.deepEqual(Object.keys(results), [ 'message' ]);
    assert.equal(results.message, 'test');
};

exports['copies of an Error keep its prototype and message'] = function () {
    var obj = { e : new TypeError('x') };
    obj.e.code = 7;

    var cloned = Traverse(obj).clone();
    assert.ok(cloned.e !== obj.e);
    assert.ok(cloned.e instanceof TypeError);
    assert.ok(cloned.e instanceof Error);
    assert.equal(cloned.e.name, 'TypeError');
    assert.deepEqual(Object.keys(cloned.e), [ 'message', 'code' ]);
    assert.equal(cloned.e.message, 'x');
    assert.equal(cloned.e.code, 7);

    var visited = [];
    var mapped = Traverse(obj).map(function (node) {
        if (this.key === 'message') {
            visited.push(this.path.join('.'));
            this.update(node.toUpperCase());
        }
    });
    assert.deepEqual(visited, [ 'e.message' ]);
    assert.ok(mapped.e instanceof TypeError);
    assert.equal(mapped.e.message, 'X');
    assert.equal(mapped.e.code, 7);
    assert.equal(obj.e.message, 'x');
};
