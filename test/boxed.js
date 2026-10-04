'use strict';

var test = require('tape');
var hasToStringTag = require('has-tostringtag')();
var setProto = require('set-proto');
var traverse = require('../');

function makeInput() {
	var n = Object(3);
	n.extra = { v: 1 };
	var s = Object('ab');
	s.extra = { v: 1 };
	var b = Object(false);
	b.extra = { v: 1 };
	return { n: n, s: s, b: b };
}

function bump(x) {
	if (x === 1) {
		this.update(2);
	}
}

test('map does not modify boxed primitives in its input', function (t) {
	var input = makeInput();
	var result = traverse(input).map(bump);

	t.deepEqual(
		[input.n.extra.v, input.s.extra.v, input.b.extra.v],
		[1, 1, 1],
		'the input is not modified'
	);
	t.deepEqual(
		[result.n.extra.v, result.s.extra.v, result.b.extra.v],
		[2, 2, 2],
		'the result is updated'
	);
	t.notEqual(result.n, input.n, 'a Number object is copied');
	t.notEqual(result.s, input.s, 'a String object is copied');
	t.notEqual(result.b, input.b, 'a Boolean object is copied');

	t.end();
});

test('immutable forEach does not modify boxed primitives in its input', function (t) {
	var input = makeInput();
	var result = traverse(input, { immutable: true }).forEach(bump);

	t.deepEqual(
		[input.n.extra.v, input.s.extra.v, input.b.extra.v],
		[1, 1, 1],
		'the input is not modified'
	);
	t.deepEqual(
		[result.n.extra.v, result.s.extra.v, result.b.extra.v],
		[2, 2, 2],
		'the result is updated'
	);

	t.end();
});

test('clone copies boxed primitives', function (t) {
	var input = makeInput();
	var result = traverse(input).clone();

	t.notEqual(result.n, input.n, 'a Number object is copied');
	t.notEqual(result.s, input.s, 'a String object is copied');
	t.notEqual(result.b, input.b, 'a Boolean object is copied');

	t.equal(typeof result.n, 'object', 'a Number object stays an object');
	t.equal(result.n.valueOf(), 3, 'a Number object keeps its value');
	t.equal(result.s.valueOf(), 'ab', 'a String object keeps its value');
	t.equal(result.b.valueOf(), false, 'a Boolean object for false keeps its value');

	t.deepEqual(Object.keys(result.s), ['0', '1', 'extra'], 'a String object keeps its characters and own properties');
	t.notEqual(result.n.extra, input.n.extra, 'own properties are deeply copied');
	t.deepEqual(result.n.extra, { v: 1 }, 'own properties keep their values');

	t.end();
});

test('copies of boxed primitives keep their prototype', { skip: !setProto }, function (t) {
	var proto = Object.create(Number.prototype);
	proto.hi = function () { return 'hi'; };
	var n = setProto(Object(5), proto);

	var cloned = traverse(n).clone();
	t.equal(Object.getPrototypeOf(cloned), proto, 'clone keeps the prototype');
	t.equal(cloned.hi(), 'hi', 'clone keeps inherited methods');
	t.equal(cloned.valueOf(), 5, 'clone keeps the value');

	var mapped = traverse({ n: n }).map(function () {});
	t.equal(Object.getPrototypeOf(mapped.n), proto, 'map keeps the prototype');

	t.end();
});

test('an object that only claims to be a boxed primitive does not throw', { skip: !hasToStringTag }, function (t) {
	var fake = { a: 1 };
	fake[Symbol.toStringTag] = 'Boolean';

	var cloned;
	t.doesNotThrow(function () { cloned = traverse(fake).clone(); }, 'clone does not throw');
	t.equal(cloned.a, 1, 'its properties are kept');

	t.end();
});
