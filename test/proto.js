'use strict';

var test = require('tape');
var traverse = require('../');

var has = Object.prototype.hasOwnProperty;

function getSource() {
	return JSON.parse('{"__proto__":{"isAdmin":true,"deep":{"x":1}},"a":1}');
}

// in engines where `__proto__` is magic on every object, JSON.parse replaces the [[Prototype]] instead, and an own `__proto__` can not be read
var hasOwnProto = has.call(getSource(), '__proto__');

function getOwnProto(obj) {
	var desc = Object.getOwnPropertyDescriptor(obj, '__proto__');
	return desc && desc.value;
}

function addOwnProto(obj) {
	Object.defineProperty(obj, '__proto__', {
		configurable: true,
		enumerable: true,
		value: { isAdmin: true },
		writable: true,
	});
	return obj;
}

var protoPaths = [
	[],
	['__proto__'],
	['__proto__', 'isAdmin'],
	['__proto__', 'deep'],
	['__proto__', 'deep', 'x'],
	['a'],
];

function isCopied(t, res, src) {
	t.ok(has.call(res, '__proto__'), 'has an own `__proto__`');
	t.same(
		Object.getOwnPropertyDescriptor(res, '__proto__'),
		{
			configurable: true,
			enumerable: true,
			value: { isAdmin: true, deep: { x: 1 } },
			writable: true,
		},
		'own `__proto__` is an enumerable, writable, configurable data property'
	);
	t.same(Object.keys(res), ['__proto__', 'a'], 'has the same own keys');
	t.equal(res.a, 1, 'other keys are copied');

	t.equal(Object.getPrototypeOf(res), Object.prototype, '[[Prototype]] is unchanged');
	t.notOk('isAdmin' in res, 'does not inherit from the `__proto__` value');

	t.notEqual(res.__proto__, src.__proto__, 'own `__proto__` is not aliased');
	t.notEqual(res.__proto__.deep, src.__proto__.deep, 'own `__proto__` is deeply copied');
	t.equal(Object.getPrototypeOf(res.__proto__), Object.prototype, 'own `__proto__` has an unchanged [[Prototype]]');

	t.same(getOwnProto(src), { isAdmin: true, deep: { x: 1 } }, 'source is not modified');
	t.equal(Object.getPrototypeOf(src), Object.prototype, 'source [[Prototype]] is unchanged');
}

test('clone with an own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();
	isCopied(t, traverse(src).clone(), src);
	isCopied(t, traverse.clone(src), src);
	isCopied(t, traverse(src, { includeSymbols: true }).clone(), src);

	t.end();
});

test('clone with a circular own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();
	src.__proto__.deep.src = src;

	var res = traverse(src).clone();
	t.ok(has.call(res, '__proto__'), 'has an own `__proto__`');
	t.equal(res.__proto__.deep.src, res, 'circular reference points at the clone');
	t.equal(Object.getPrototypeOf(res), Object.prototype, '[[Prototype]] is unchanged');

	t.end();
});

test('map with an own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();
	var paths = [];
	var res = traverse(src).map(function () {
		paths.push(this.path);
	});

	isCopied(t, res, src);
	t.same(paths, protoPaths, 'visits `__proto__` and its descendants');

	t.end();
});

test('immutable forEach with an own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();
	var paths = [];
	var nodes = [];
	var res = traverse(src, { immutable: true }).forEach(function (x) {
		paths.push(this.path);
		if (this.key === '__proto__') {
			nodes.push(x);
		}
	});

	isCopied(t, res, src);
	t.same(paths, protoPaths, 'visits `__proto__` and its descendants');
	t.same(nodes, [{ isAdmin: true, deep: { x: 1 } }], 'visits the own `__proto__` value');

	t.end();
});

test('update with an own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();

	var replaced = traverse(src).map(function () {
		if (this.key === '__proto__') {
			this.update({ replaced: true });
		}
	});
	t.same(
		Object.getOwnPropertyDescriptor(replaced, '__proto__'),
		{
			configurable: true,
			enumerable: true,
			value: { replaced: true },
			writable: true,
		},
		'update replaces the own `__proto__`'
	);
	t.equal(Object.getPrototypeOf(replaced), Object.prototype, 'update leaves the [[Prototype]] unchanged');
	t.notOk('replaced' in replaced, 'does not inherit from the updated value');

	var returned = traverse(src).map(function () {
		if (this.key === '__proto__') {
			return null;
		}
		return void undefined;
	});
	t.ok(has.call(returned, '__proto__'), 'a returned value keeps `__proto__` an own property');
	t.equal(returned.__proto__, null, 'a returned value replaces the own `__proto__`');
	t.equal(Object.getPrototypeOf(returned), Object.prototype, 'a returned value leaves the [[Prototype]] unchanged');

	var descendants = traverse(src).map(function (x) {
		if (this.path[0] === '__proto__' && typeof x === 'number') {
			this.update(x + 1);
		}
	});
	t.same(getOwnProto(descendants), { isAdmin: true, deep: { x: 2 } }, 'update works on descendants of `__proto__`');
	t.equal(Object.getPrototypeOf(descendants), Object.prototype, 'updating descendants leaves the [[Prototype]] unchanged');

	t.same(getOwnProto(src), { isAdmin: true, deep: { x: 1 } }, 'source is not modified');

	var mutated = traverse(src).forEach(function () {
		if (this.key === '__proto__') {
			this.update({ replaced: true });
		}
	});
	t.equal(mutated, src, 'a mutable forEach returns the source');
	t.same(getOwnProto(src), { replaced: true }, 'a mutable update replaces the own `__proto__` in place');
	t.equal(Object.getPrototypeOf(src), Object.prototype, 'a mutable update leaves the [[Prototype]] unchanged');

	t.end();
});

test('remove and delete with an own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = getSource();

	var removed = traverse(src).map(function () {
		if (this.key === '__proto__') {
			this.remove();
		}
	});
	t.notOk(has.call(removed, '__proto__'), 'remove removes the own `__proto__`');
	t.same(Object.keys(removed), ['a']);
	t.equal(Object.getPrototypeOf(removed), Object.prototype, 'remove leaves the [[Prototype]] unchanged');

	var deleted = traverse(src).map(function () {
		if (this.key === '__proto__') {
			this.delete();
		}
	});
	t.notOk(has.call(deleted, '__proto__'), 'delete removes the own `__proto__`');
	t.same(Object.keys(deleted), ['a']);
	t.equal(Object.getPrototypeOf(deleted), Object.prototype, 'delete leaves the [[Prototype]] unchanged');

	var restored = traverse(src).map(function () {
		if (this.key === '__proto__') {
			this.remove();
			this.update({ restored: true });
		}
	});
	t.same(
		Object.getOwnPropertyDescriptor(restored, '__proto__'),
		{
			configurable: true,
			enumerable: true,
			value: { restored: true },
			writable: true,
		},
		'update after remove recreates the own `__proto__`'
	);
	t.equal(Object.getPrototypeOf(restored), Object.prototype, 'update after remove leaves the [[Prototype]] unchanged');
	t.notOk('restored' in restored, 'does not inherit from the value updated after remove');

	t.ok(has.call(src, '__proto__'), 'source is not modified');

	t.end();
});

test('update with a non-writable own __proto__', { skip: !hasOwnProto }, function (t) {
	var src = { a: 1 };
	Object.defineProperty(src, '__proto__', {
		configurable: true,
		enumerable: true,
		value: { isAdmin: true },
		writable: false,
	});

	t.throws(
		function () {
			traverse(src).forEach(function () {
				if (this.key === '__proto__') {
					this.update({ replaced: true });
				}
			});
		},
		TypeError,
		'throws, as it does for any other non-writable key'
	);
	t.same(getOwnProto(src), { isAdmin: true }, 'own `__proto__` is unchanged');
	t.equal(Object.getPrototypeOf(src), Object.prototype, '[[Prototype]] is unchanged');

	t.end();
});

test('own __proto__ on objects with other prototypes', { skip: !hasOwnProto }, function (t) {
	function Foo() {
		this.a = 1;
	}
	Foo.prototype.method = function () {};

	var instance = addOwnProto(new Foo());
	var array = addOwnProto([1, 2]);
	var nullObject = addOwnProto(Object.create(null));

	function noop() {}

	var instances = [
		traverse(instance).clone(),
		traverse(instance).map(noop),
		traverse(instance, { immutable: true }).forEach(noop),
	];
	var arrays = [
		traverse(array).clone(),
		traverse(array).map(noop),
		traverse(array, { immutable: true }).forEach(noop),
	];
	var nullObjects = [
		traverse(nullObject).clone(),
		traverse(nullObject).map(noop),
		traverse(nullObject, { immutable: true }).forEach(noop),
	];

	for (var i = 0; i < instances.length; i++) {
		t.equal(Object.getPrototypeOf(instances[i]), Foo.prototype, 'instance keeps its [[Prototype]]');
		t.same(getOwnProto(instances[i]), { isAdmin: true }, 'instance has an own `__proto__`');
		t.notEqual(getOwnProto(instances[i]), getOwnProto(instance), 'instance own `__proto__` is not aliased');
		t.equal(instances[i].a, 1, 'instance keeps its other own properties');

		t.equal(Object.getPrototypeOf(arrays[i]), Array.prototype, 'array keeps its [[Prototype]]');
		t.same(getOwnProto(arrays[i]), { isAdmin: true }, 'array has an own `__proto__`');
		t.same([].concat(arrays[i]), [1, 2], 'array keeps its elements');

		t.equal(Object.getPrototypeOf(nullObjects[i]), null, 'null object keeps its [[Prototype]]');
		t.same(getOwnProto(nullObjects[i]), { isAdmin: true }, 'null object has an own `__proto__`');
	}

	t.end();
});

test('clone of a nested typed array with an own __proto__', { skip: !hasOwnProto || typeof Uint8Array !== 'function' }, function (t) {
	var src = { ta: addOwnProto(new Uint8Array([1, 2])) };
	var res = traverse(src).clone();

	t.equal(Object.getPrototypeOf(res.ta), Uint8Array.prototype, 'typed array keeps its [[Prototype]]');
	t.same(getOwnProto(res.ta), { isAdmin: true }, 'typed array has an own `__proto__`');
	t.notEqual(getOwnProto(res.ta), getOwnProto(src.ta), 'typed array own `__proto__` is not aliased');
	t.notOk('isAdmin' in res.ta, 'typed array does not inherit from the `__proto__` value');
	t.equal(res.ta[1], 2, 'typed array keeps its elements');

	t.end();
});

test('a __proto__ key does not pollute Object.prototype', function (t) {
	var names = Object.getOwnPropertyNames(Object.prototype).sort();
	var src = getSource();

	traverse(src).clone();
	traverse(src).map(function (x) {
		if (typeof x === 'number') {
			this.update(x + 1);
		}
	});
	traverse(src, { immutable: true }).forEach(function () {
		if (this.key === '__proto__') {
			this.remove();
			this.update({ polluted: true });
		}
	});

	t.same(Object.getOwnPropertyNames(Object.prototype).sort(), names, 'Object.prototype has the same own property names');
	t.equal(Object.getPrototypeOf(Object.prototype), null, 'Object.prototype has the same [[Prototype]]');
	t.equal({}.isAdmin, undefined);
	t.equal({}.deep, undefined);
	t.equal({}.polluted, undefined);

	t.end();
});
