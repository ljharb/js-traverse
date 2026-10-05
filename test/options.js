'use strict';

var test = require('tape');
var forEach = require('for-each');
var traverse = require('../');

test('an undefined or null options argument is the same as none', function (t) {
	forEach([undefined, null], function (options) {
		var label = String(options) + ': ';
		var obj = { a: { b: 1 } };

		t.same(traverse(obj, options).paths(), [[], ['a'], ['a', 'b']], label + 'paths');
		t.same(traverse(obj, options).nodes(), [obj, obj.a, 1], label + 'nodes');
		t.same(traverse(obj, options).clone(), obj, label + 'clone');
		t.same(
			traverse(obj, options).map(function (x) {
				if (x === 1) { this.update(2); }
			}),
			{ a: { b: 2 } },
			label + 'map'
		);
		t.equal(traverse(obj, options).get(['a', 'b']), 1, label + 'get');
		t.equal(traverse(obj, options).has(['a', 'b']), true, label + 'has');
		t.equal(
			traverse(obj, options).reduce(function (acc, x) {
				return this.isLeaf ? acc + x : acc;
			}, 0),
			1,
			label + 'reduce'
		);
		traverse(obj, options).forEach(function (x) {
			if (x === 1) { this.update(3); }
		});
		t.same(obj, { a: { b: 3 } }, label + 'forEach');
	});

	t.end();
});
