'use strict';

var test = require('tape');
var traverse = require('../');

test('a failed assignment while walking does not throw', function (t) {
	var obj = { a: Object.freeze({ b: 1, c: [2] }) };

	t.doesNotThrow(function () {
		traverse(obj).forEach(function (x) {
			if (this.key === 'b') { this.update(x + 1); }
		});
	}, 'update on a frozen parent');
	t.equal(obj.a.b, 1, 'the frozen property is unchanged');

	t.doesNotThrow(function () {
		traverse(obj).forEach(function () {
			if (this.key === 'b') { this.delete(); }
		});
	}, 'delete on a frozen parent');
	t.equal(obj.a.b, 1, 'the frozen property is still there');

	t.end();
});

test('a failed assignment in set() throws', function (t) {
	var frozen = Object.freeze({ a: 1 });
	t.throws(function () { traverse(frozen).set(['a'], 2); }, TypeError, 'non-writable property');
	t.throws(function () { traverse(frozen).set(['b'], 2); }, TypeError, 'new property on a frozen object');
	t.throws(function () { traverse({ x: frozen }).set(['x', 'b', 'c'], 2); }, TypeError, 'intermediate property on a frozen object');
	t.throws(function () { traverse({ s: 'str' }).set(['s', 'length'], 2); }, TypeError, 'property of a primitive');
	t.deepEqual(frozen, { a: 1 }, 'the frozen object is unchanged');

	var sealed = Object.seal({ a: 1 });
	t.equal(traverse(sealed).set(['a'], 2), 2, 'an existing writable property can still be set');
	t.equal(sealed.a, 2);

	t.end();
});
