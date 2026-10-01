'use strict';

var test = require('tape');
var traverse = require('../');

test('traverse an Error', function (t) {
	var obj = new Error('test');
	var results = traverse(obj).map(function () {});
	t.ok(results instanceof Error);
	t.equal(Object.getPrototypeOf(results), Error.prototype);
	t.same(Object.keys(results), ['message']);
	t.equal(results.message, 'test');

	t.end();
});

test('copies of an Error keep its prototype and message', function (t) {
	var obj = { e: new TypeError('x') };
	obj.e.code = 7;

	var cloned = traverse(obj).clone();
	t.ok(cloned.e !== obj.e);
	t.ok(cloned.e instanceof TypeError);
	t.ok(cloned.e instanceof Error);
	t.equal(cloned.e.name, 'TypeError');
	t.same(Object.keys(cloned.e), ['message', 'code']);
	t.equal(cloned.e.message, 'x');
	t.equal(cloned.e.code, 7);

	var visited = [];
	var mapped = traverse(obj).map(function (node) {
		if (this.key === 'message') {
			visited.push(this.path.join('.'));
			this.update(node.toUpperCase());
		}
	});
	t.same(visited, ['e.message']);
	t.ok(mapped.e instanceof TypeError);
	t.equal(mapped.e.message, 'X');
	t.equal(mapped.e.code, 7);
	t.equal(obj.e.message, 'x');

	t.end();
});

var setProto = Object.setPrototypeOf || function (obj, proto) {
	obj.__proto__ = proto; // eslint-disable-line no-param-reassign
	return obj;
};

function copiesOf(obj) {
	return {
		clone: traverse(obj).clone(),
		map: traverse(obj).map(function () {}),
		'immutable forEach': traverse(obj, { immutable: true }).forEach(function () {}),
	};
}

test('copies of an Error whose prototype has a non-writable message', function (t) {
	var proto = Object.create(Error.prototype);
	Object.defineProperty(proto, 'message', { value: 'from prototype', writable: false });
	var obj = setProto(new Error('own message'), proto);

	var copies = copiesOf(obj);
	for (var name in copies) { // eslint-disable-line no-restricted-syntax
		var copied = copies[name];
		t.ok(copied !== obj, name + ': is a copy');
		t.equal(Object.getPrototypeOf(copied), proto, name + ': keeps the prototype');
		t.same(
			Object.getOwnPropertyDescriptor(copied, 'message'),
			{ value: 'own message', writable: true, enumerable: true, configurable: true },
			name + ': has an own message'
		);
	}

	t.end();
});

test('copies of an Error subclass whose prototype has a message accessor', function (t) {
	var setterCalls = 0;
	function Subclass() {}
	Subclass.prototype = Object.create(Error.prototype, {
		constructor: { configurable: true, value: Subclass, writable: true },
		message: {
			configurable: true,
			get: function () { return 'accessor'; },
			set: function () { setterCalls += 1; },
		},
	});
	var obj = setProto(new Error(), Subclass.prototype);

	var copies = copiesOf(obj);
	for (var name in copies) { // eslint-disable-line no-restricted-syntax
		var copied = copies[name];
		t.ok(copied !== obj, name + ': is a copy');
		t.ok(copied instanceof Subclass, name + ': keeps the prototype');
		t.same(
			Object.getOwnPropertyDescriptor(copied, 'message'),
			{ value: 'accessor', writable: true, enumerable: true, configurable: true },
			name + ': has an own message'
		);
	}
	t.equal(setterCalls, 0, 'the prototype\'s message setter is not called');

	t.end();
});
