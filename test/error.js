var test = require('tape');
var traverse = require('../');

test('traverse an Error', function (t) {
    var obj = new Error("test");
    var results = traverse(obj).map(function (node) {});
    t.ok(results instanceof Error);
    t.equal(Object.getPrototypeOf(results), Error.prototype);
    t.same(Object.keys(results), [ 'message' ]);
    t.equal(results.message, 'test');

    t.end();
});

test('copies of an Error keep its prototype and message', function (t) {
    var obj = { e : new TypeError('x') };
    obj.e.code = 7;

    var cloned = traverse(obj).clone();
    t.ok(cloned.e !== obj.e);
    t.ok(cloned.e instanceof TypeError);
    t.ok(cloned.e instanceof Error);
    t.equal(cloned.e.name, 'TypeError');
    t.same(Object.keys(cloned.e), [ 'message', 'code' ]);
    t.equal(cloned.e.message, 'x');
    t.equal(cloned.e.code, 7);

    var visited = [];
    var mapped = traverse(obj).map(function (node) {
        if (this.key === 'message') {
            visited.push(this.path.join('.'));
            this.update(node.toUpperCase());
        }
    });
    t.same(visited, [ 'e.message' ]);
    t.ok(mapped.e instanceof TypeError);
    t.equal(mapped.e.message, 'X');
    t.equal(mapped.e.code, 7);
    t.equal(obj.e.message, 'x');

    t.end();
});
