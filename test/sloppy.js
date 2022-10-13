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
