'use strict';

var test = require('tape');
var traverse = require('../');

test('the export is the constructor', function (t) {
	var obj = { a: [1] };

	var called = traverse(obj);
	t.ok(called instanceof traverse);
	t.equal(called.value, obj);

	var constructed = new traverse(obj); // eslint-disable-line new-cap
	t.ok(constructed instanceof traverse);
	t.equal(constructed.value, obj);

	t.end();
});

test('methods added to the prototype are available', function (t) {
	traverse.prototype.leafCount = function () {
		return this.reduce(function (acc) {
			return this.isLeaf ? acc + 1 : acc;
		}, 0);
	};
	try {
		t.equal(traverse({ a: [1, 2], b: 3 }).leafCount(), 3);
		t.equal(new traverse([1]).leafCount(), 1); // eslint-disable-line new-cap
	} finally {
		delete traverse.prototype.leafCount;
	}

	t.end();
});

test('every method has a static form', function (t) {
	var names = [
		'get', 'has', 'set', 'map', 'forEach',
		'reduce', 'paths', 'nodes', 'clone',
	];
	names.forEach(function (name) {
		t.equal(typeof traverse.prototype[name], 'function', name);
		t.equal(typeof traverse[name], 'function', name);
	});
	Object.keys(traverse.prototype).forEach(function (name) {
		t.equal(typeof traverse[name], 'function', name);
	});

	var obj = { a: { b: 1 } };
	t.equal(traverse.get(obj, ['a', 'b']), 1);
	t.equal(traverse.has(obj, ['a', 'b']), true);
	t.equal(traverse.set(obj, ['a', 'c'], 2), 2);
	t.equal(obj.a.c, 2);
	t.same(traverse.paths(obj), [[], ['a'], ['a', 'b'], ['a', 'c']]);
	t.same(traverse.nodes(obj), [obj, obj.a, 1, 2]);
	t.same(traverse.clone(obj), obj);
	t.ok(traverse.clone(obj) !== obj);
	t.equal(traverse.reduce(obj, function (acc, x) {
		return this.isLeaf ? acc + x : acc;
	}, 0), 3);

	t.end();
});

test('options are taken with or without new', function (t) {
	var sym = typeof Symbol === 'function' ? Symbol('s') : null;
	var obj = { a: 1 };
	if (sym) { obj[sym] = 2; }

	[undefined, null].forEach(function (options) {
		t.same(traverse(obj, options).paths(), [[], ['a']], String(options) + ': called');
		t.same(new traverse(obj, options).paths(), [[], ['a']], String(options) + ': constructed'); // eslint-disable-line new-cap
		t.equal(new traverse(obj, options).options, traverse(obj).options, String(options) + ': default options'); // eslint-disable-line new-cap
	});

	var included = { includeSymbols: true };
	t.equal(traverse(obj, included).options, included, 'called: options kept');
	t.equal(new traverse(obj, included).options, included, 'constructed: options kept'); // eslint-disable-line new-cap
	if (sym) {
		t.same(traverse(obj, included).paths(), [[], ['a'], [sym]], 'called: includeSymbols');
	}

	t.end();
});
