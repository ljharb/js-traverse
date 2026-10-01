'use strict';

var test = require('tape');
var v = require('es-value-fixtures');
var traverse = require('../');

var has = Object.prototype.hasOwnProperty;

// in engines where `__proto__` is magic on every object, JSON.parse replaces the [[Prototype]] instead, and an own `__proto__` can not be read
var hasOwnProto = has.call(JSON.parse('{"__proto__":{}}'), '__proto__');

var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
	obj.__proto__ = proto; // eslint-disable-line no-param-reassign
};

var builtins = [
	{ name: 'Object.prototype', value: Object.prototype },
	{ name: 'Function.prototype', value: Function.prototype },
	{ name: 'Array.prototype', value: Array.prototype },
	{ name: 'String.prototype', value: String.prototype },
	{ name: 'Number.prototype', value: Number.prototype },
	{ name: 'Boolean.prototype', value: Boolean.prototype },
	{ name: 'Number', value: Number },
	{ name: 'Number.prototype.toString', value: Number.prototype.toString },
].concat(
	v.hasSymbols ? { name: 'Symbol.prototype', value: Symbol.prototype } : [],
	v.bigints.length > 0 ? { name: 'BigInt.prototype', value: Object.getPrototypeOf(Object(v.bigints[0])) } : []
);

function getState() {
	var state = [];
	for (var i = 0; i < builtins.length; i++) {
		state[i] = {
			names: Object.getOwnPropertyNames(builtins[i].value),
			proto: Object.getPrototypeOf(builtins[i].value),
		};
	}
	return state;
}

// reverts as it reports, so that a failure here can not cascade into the tests that run after it
function undoPollution(state) {
	var pollution = [];
	for (var i = 0; i < builtins.length; i++) {
		var builtin = builtins[i].value;
		var names = Object.getOwnPropertyNames(builtin);
		for (var j = 0; j < names.length; j++) {
			if (state[i].names.indexOf(names[j]) < 0) {
				pollution.push(builtins[i].name + ' gained `' + names[j] + '`');
				delete builtin[names[j]];
			}
		}
		if (Object.getPrototypeOf(builtin) !== state[i].proto) {
			pollution.push(builtins[i].name + ' has a different [[Prototype]]');
			setPrototypeOf(builtin, state[i].proto);
		}
	}
	return pollution;
}

function getOwnProto(obj) {
	var desc = Object(obj) === obj && Object.getOwnPropertyDescriptor(obj, '__proto__');
	return desc ? desc.value : void undefined;
}

test('set', function (t) {
	var state = getState();
	t.teardown(function () { undoPollution(state); });

	var obj = { a: { b: 1 }, c: [1, 2] };

	t.equal(traverse(obj).set(['a', 'b'], 2), 2, 'returns the value');
	t.same(obj, { a: { b: 2 }, c: [1, 2] }, 'replaces an existing value');

	var a = obj.a;
	traverse(obj).set(['a', 'd', 'e'], 3);
	t.equal(obj.a, a, 'keeps the existing nodes on the path');
	t.same(obj, { a: { b: 2, d: { e: 3 } }, c: [1, 2] }, 'creates the missing nodes on the path');

	traverse(obj).set(['c', 1], 4);
	traverse(obj).set(['c', 2, 0], 5);
	t.same(obj, { a: { b: 2, d: { e: 3 } }, c: [1, 4, { 0: 5 }] }, 'sets array indexes');

	t.equal(traverse.set(obj, ['f', 'g'], 6), 6, 'static form returns the value');
	t.same(obj.f, { g: 6 }, 'static form sets the value');

	var inherited = {};
	traverse(inherited).set(['constructor', 'prototype', 'polluted'], 'yes');
	t.ok(has.call(inherited, 'constructor'), 'an inherited key is created as an own property');
	t.same(inherited.constructor, { prototype: { polluted: 'yes' } }, 'an inherited value is not descended into');

	t.throws(
		function () { traverse({ a: 1 }).set(['a', 'b', 'c'], 2); },
		TypeError,
		'a path that crosses a primitive throws'
	);
	t.throws(
		function () { traverse({ a: 1 }).set(['a', 'b'], 2); },
		TypeError,
		'a path that ends on a primitive throws'
	);
	t.throws(
		function () { traverse({ a: 1 }).set(['a', 0], 2); },
		TypeError,
		'a path that ends on a primitive, with an index, throws'
	);

	t.same(undoPollution(state), [], 'no built-in is modified');

	t.test('symbols', { skip: !v.hasSymbols }, function (st) {
		var sym = Symbol('s');
		var symObj = {};

		st.equal(traverse(symObj).set([sym, sym], 1), 1, 'returns the value');
		st.ok(has.call(symObj, sym), 'creates the missing nodes on the path');
		st.equal(traverse(symObj, { includeSymbols: true }).get([sym, sym]), 1, 'sets the value');

		var boxed = {};
		traverse(boxed).set([Object(sym)], 2);
		st.equal(boxed[sym], 2, 'a boxed symbol segment is used as that symbol');

		st.end();
	});

	t.end();
});

test('set coerces each path segment once', function (t) {
	var state = getState();
	t.teardown(function () { undoPollution(state); });

	var calls = 0;
	var segment = {
		toString: function () {
			calls += 1;
			return calls > 1 ? '__proto__' : 'a';
		},
	};
	var obj = { a: {} };

	traverse(obj).set([segment, 'polluted'], 'yes');

	t.equal(calls, 1, 'segment is coerced once');
	t.same(obj, { a: { polluted: 'yes' } }, 'the same key is used throughout');
	t.same(undoPollution(state), [], 'no built-in is modified');

	t.end();
});

test('set with a __proto__ segment', { skip: !hasOwnProto }, function (t) {
	var state = getState();
	t.teardown(function () { undoPollution(state); });

	var obj = {};
	t.equal(traverse(obj).set(['__proto__', 'x'], 1), 1, 'returns the value');
	t.same(
		Object.getOwnPropertyDescriptor(obj, '__proto__'),
		{
			configurable: true,
			enumerable: true,
			value: { x: 1 },
			writable: true,
		},
		'creates an enumerable, writable, configurable own `__proto__`'
	);
	t.same(Object.keys(obj), ['__proto__'], 'own `__proto__` is the only key');
	t.equal(Object.getPrototypeOf(obj), Object.prototype, '[[Prototype]] is unchanged');
	t.notOk('x' in obj, 'does not inherit from the `__proto__` value');
	t.equal(traverse(obj).get(['__proto__', 'x']), 1, 'get finds the value');
	t.equal(traverse(obj).has(['__proto__', 'x']), true, 'has finds the value');

	var value = { isAdmin: true };
	var last = { a: {} };
	traverse(last).set(['a', '__proto__'], value);
	t.equal(getOwnProto(last.a), value, 'as the last segment, sets an own `__proto__`');
	t.equal(Object.getPrototypeOf(last.a), Object.prototype, 'as the last segment, [[Prototype]] is unchanged');
	t.notOk('isAdmin' in last.a, 'as the last segment, does not inherit from the value');
	t.equal(traverse(last).get(['a', '__proto__']), value, 'as the last segment, get finds the value');

	var only = {};
	traverse(only).set(['__proto__'], value);
	t.equal(getOwnProto(only), value, 'as the only segment, sets an own `__proto__`');
	t.equal(Object.getPrototypeOf(only), Object.prototype, 'as the only segment, [[Prototype]] is unchanged');

	var repeated = {};
	traverse(repeated).set(['__proto__', '__proto__', 'x'], 1);
	var nested = getOwnProto(repeated);
	t.same(getOwnProto(nested), { x: 1 }, 'repeated, creates nested own `__proto__`s');
	t.equal(Object.getPrototypeOf(repeated), Object.prototype, 'repeated, [[Prototype]] is unchanged');
	t.equal(Object(nested) === nested && Object.getPrototypeOf(nested), Object.prototype, 'repeated, nested [[Prototype]] is unchanged');
	t.equal(traverse(repeated).get(['__proto__', '__proto__', 'x']), 1, 'repeated, get finds the value');

	var coerced = {};
	traverse(coerced).set([['__proto__'], 'x'], 1);
	t.same(getOwnProto(coerced), { x: 1 }, 'coerced from an object, creates an own `__proto__`');
	t.equal(Object.getPrototypeOf(coerced), Object.prototype, 'coerced from an object, [[Prototype]] is unchanged');

	var coercedLast = { a: {} };
	traverse(coercedLast).set(['a', ['__proto__']], value);
	t.equal(getOwnProto(coercedLast.a), value, 'coerced from an object, as the last segment, sets an own `__proto__`');
	t.equal(
		Object.getPrototypeOf(coercedLast.a),
		Object.prototype,
		'coerced from an object, as the last segment, [[Prototype]] is unchanged'
	);

	var parsed = JSON.parse('{"__proto__":{"a":1}}');
	var existing = getOwnProto(parsed);
	traverse(parsed).set(['__proto__', 'b'], 2);
	t.equal(getOwnProto(parsed), existing, 'an existing own `__proto__` is kept');
	t.same(existing, { a: 1, b: 2 }, 'an existing own `__proto__` is descended into');
	traverse(parsed).set(['__proto__'], 3);
	t.equal(getOwnProto(parsed), 3, 'an existing own `__proto__` is replaced');
	t.equal(Object.getPrototypeOf(parsed), Object.prototype, 'with an existing own `__proto__`, [[Prototype]] is unchanged');

	var viaStatic = {};
	t.equal(traverse.set(viaStatic, ['__proto__', 'x'], 1), 1, 'static form returns the value');
	t.same(getOwnProto(viaStatic), { x: 1 }, 'static form creates an own `__proto__`');
	t.equal(Object.getPrototypeOf(viaStatic), Object.prototype, 'static form leaves the [[Prototype]] unchanged');

	function Foo() {}
	var targets = [
		{ name: 'instance', value: new Foo(), proto: Foo.prototype },
		{ name: 'array', value: [], proto: Array.prototype },
		{ name: 'function', value: function () {}, proto: Function.prototype },
		{ name: 'boxed string', value: Object('x'), proto: String.prototype },
		{ name: 'null object', value: Object.create(null), proto: null },
	];
	for (var i = 0; i < targets.length; i++) {
		traverse(targets[i].value).set(['__proto__', 'x'], 1);
		t.same(getOwnProto(targets[i].value), { x: 1 }, targets[i].name + ' gets an own `__proto__`');
		t.equal(Object.getPrototypeOf(targets[i].value), targets[i].proto, targets[i].name + ' keeps its [[Prototype]]');
	}

	t.throws(
		function () { traverse(Object.freeze({})).set(['__proto__', 'x'], 1); },
		TypeError,
		'a non-extensible object throws'
	);

	t.same(undoPollution(state), [], 'no built-in is modified');

	t.end();
});

test('set with a __proto__ segment, where it can not be an own property', { skip: hasOwnProto }, function (t) {
	var state = getState();
	t.teardown(function () { undoPollution(state); });

	var value = { isAdmin: true };
	var owner = {};
	Object.defineProperty(owner, '__proto__', {
		configurable: true,
		enumerable: true,
		value: {},
		writable: true,
	});
	var targets = [
		{},
		{ a: {} },
		[],
		owner,
	];
	var paths = [
		['__proto__'],
		['__proto__', 'polluted'],
		['a', '__proto__'],
		['a', '__proto__', 'polluted'],
		[['__proto__'], 'polluted'],
	];

	for (var i = 0; i < targets.length; i++) {
		var proto = Object.getPrototypeOf(targets[i]);
		for (var j = 0; j < paths.length; j++) {
			t.throws(
				function () { traverse(targets[i]).set(paths[j], value); }, // eslint-disable-line no-loop-func
				TypeError,
				'target ' + i + ', path ' + j + ': throws'
			);
			t.equal(Object.getPrototypeOf(targets[i]), proto, 'target ' + i + ', path ' + j + ': [[Prototype]] is unchanged');
		}
	}
	t.equal(Object.getPrototypeOf(targets[1].a), Object.prototype, 'nested [[Prototype]] is unchanged');
	t.same(value, { isAdmin: true }, 'value is not modified');

	t.same(undoPollution(state), [], 'no built-in is modified');

	t.end();
});

test('set does not pollute built-in prototypes', function (t) {
	var state = getState();
	t.teardown(function () { undoPollution(state); });

	var cases = [
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', '__proto__', 'polluted'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', '__proto__', '__proto__', 'polluted'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', '__proto__'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', ['__proto__'], 'polluted'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', 'length', '__proto__', 'polluted'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', 0, '__proto__', 'polluted'] },
		{ target: JSON.parse('{"name":"bob"}'), path: ['name', 'constructor', 'prototype', 'polluted'] },
		{ target: { n: 1 }, path: ['n', '__proto__', 'polluted'] },
		{ target: { n: 1 }, path: ['n', '__proto__', '__proto__', 'polluted'] },
		{ target: { n: 1 }, path: ['n', 'constructor', 'prototype', 'polluted'] },
		{ target: { n: 1 }, path: ['n', 'constructor', 'polluted'] },
		{ target: { n: 1 }, path: ['n', 'toString', 'polluted'] },
		{ target: { b: true }, path: ['b', '__proto__', 'polluted'] },
		{ target: { b: true }, path: ['b', '__proto__', '__proto__', 'polluted'] },
		{ target: [], path: ['length', '__proto__', 'polluted'] },
		{ target: function () {}, path: ['length', '__proto__', 'polluted'] },
		{ target: 'x', path: ['__proto__', 'polluted'] },
		{ target: 'x', path: ['__proto__', '__proto__', 'polluted'] },
		{ target: 'x', path: ['__proto__'] },
		{ target: 'x', path: ['constructor', 'prototype', 'polluted'] },
		{ target: 1, path: ['__proto__', 'polluted'] },
		{ target: true, path: ['__proto__', 'polluted'] },
	].concat(
		v.hasSymbols ? [
			{ target: Symbol('s'), path: ['__proto__', 'polluted'] },
			{ target: { s: Symbol('s') }, path: ['s', '__proto__', 'polluted'] },
			{ target: { s: Symbol('s') }, path: ['s', '__proto__', '__proto__', 'polluted'] },
		] : [],
		v.bigints.length > 0 ? [
			{ target: v.bigints[0], path: ['__proto__', 'polluted'] },
			{ target: { g: v.bigints[0] }, path: ['g', '__proto__', 'polluted'] },
			{ target: { g: v.bigints[0] }, path: ['g', '__proto__', '__proto__', 'polluted'] },
		] : []
	);
	var value = { isAdmin: true };

	for (var i = 0; i < cases.length; i++) {
		var label = 'case ' + i;
		t.throws(
			function () { traverse(cases[i].target).set(cases[i].path, value); }, // eslint-disable-line no-loop-func
			TypeError,
			label + ': throws'
		);
		t.same(undoPollution(state), [], label + ': no built-in is modified');

		t.throws(
			function () { traverse.set(cases[i].target, cases[i].path, value); }, // eslint-disable-line no-loop-func
			TypeError,
			label + ': static form throws'
		);
		t.same(undoPollution(state), [], label + ': static form modifies no built-in');
	}

	t.same(value, { isAdmin: true }, 'value is not modified');

	t.end();
});

test('set does not follow an accessor that a primitive inherits', function (t) {
	var inherited = {};
	Object.defineProperty(Number.prototype, 'inherited', { // eslint-disable-line no-extend-native
		configurable: true,
		get: function () { return inherited; },
		set: function () {},
	});
	var state = getState();
	t.teardown(function () {
		undoPollution(state);
		delete Number.prototype.inherited;
	});

	t.throws(
		function () { traverse({ n: 1 }).set(['n', 'inherited', 'polluted'], 'yes'); },
		TypeError,
		'throws'
	);
	t.same(inherited, {}, 'the inherited value is not modified');
	t.throws(
		function () { traverse({ n: 1 }).set(['n', 'inherited'], 'yes'); },
		TypeError,
		'throws when it is the last segment'
	);
	t.same(undoPollution(state), [], 'no built-in is modified');

	t.end();
});
