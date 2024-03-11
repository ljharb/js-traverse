'use strict';

var test = require('tape');
var v = require('es-value-fixtures');
var traverse = require('../');

test('symbol path segments', { skip: !v.hasSymbols }, function (t) {
	var sym = Symbol('s');
	var inner = Symbol('inner');
	var obj = { a: 1 };
	obj[sym] = {};
	obj[sym][inner] = 2;

	[undefined, { includeSymbols: false }, { includeSymbols: true }].forEach(function (options) {
		var label = 'options: ' + JSON.stringify(options);
		var walker = options ? traverse(obj, options) : traverse(obj);

		t.equal(walker.get([sym]), obj[sym], 'get: ' + label);
		t.equal(walker.get([sym, inner]), 2, 'get, nested: ' + label);
		t.equal(walker.get([Symbol('s')]), undefined, 'get, another symbol: ' + label);
		t.equal(walker.has([sym]), true, 'has: ' + label);
		t.equal(walker.has([sym, inner]), true, 'has, nested: ' + label);
		t.equal(walker.has([Symbol('s')]), false, 'has, another symbol: ' + label);
	});

	t.equal(traverse.get(obj, [sym, inner]), 2, 'static get');
	t.equal(traverse.has(obj, [sym, inner]), true, 'static has');

	t.end();
});

test('includeSymbols still controls walking', { skip: !v.hasSymbols }, function (t) {
	var sym = Symbol('s');
	var obj = { a: 1 };
	obj[sym] = 2;

	t.deepEqual(traverse(obj).paths(), [[], ['a']], 'symbols skipped by default');
	t.deepEqual(traverse(obj, { includeSymbols: true }).paths(), [[], ['a'], [sym]], 'symbols walked when included');
	t.deepEqual(new traverse(obj, { includeSymbols: true }).paths(), [[], ['a'], [sym]], 'with new'); // eslint-disable-line new-cap

	t.equal(traverse(obj).clone()[sym], undefined, 'clone skips symbols by default');
	t.equal(traverse(obj, { includeSymbols: true }).clone()[sym], 2, 'clone copies symbols when included');
	t.equal(traverse(obj).map(function () {})[sym], undefined, 'map skips symbols by default');
	t.equal(traverse(obj, { includeSymbols: true }).map(function () {})[sym], 2, 'map copies symbols when included');

	t.end();
});

test('an immutable forEach honours keys the callback assigns', function (t) {
	var obj = { a: 30, b: 22, id: 9 };
	var acc = [];
	traverse(obj, { immutable: true }).forEach(function (node) {
		if (this.isRoot) { this.keys = ['id']; }
		if (this.isLeaf) { acc.push(node); }
	});
	t.equal(acc.join(' '), '9');
	t.end();
});
