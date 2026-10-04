'use strict';

var test = require('tape');
var isTypedArray = require('is-typed-array');
var traverse = require('../');

test('traverse an Uint8Array', { skip: typeof Uint8Array !== 'function' }, function (t) {
	var obj = new Uint8Array(4);
	var results = traverse(obj).map(function () {});
	t.same(results, obj);
	t.end();
});

var buffer = typeof Buffer === 'function' && (Buffer.from ? Buffer.from([1, 2, 3]) : new Buffer([1, 2, 3]));

test('clone and map a Buffer', { skip: !isTypedArray(buffer) }, function (t) {
	var cloned = traverse({ b: buffer }).clone().b;
	t.notEqual(cloned, buffer, 'clone copies the Buffer');
	t.same(Array.prototype.slice.call(cloned), [1, 2, 3], 'clone keeps its bytes');

	var mapped = traverse({ b: buffer }).map(function () {}).b;
	t.notEqual(mapped, buffer, 'map copies the Buffer');
	t.same(Array.prototype.slice.call(mapped), [1, 2, 3], 'map keeps its bytes');

	t.same(Array.prototype.slice.call(traverse(buffer).clone()), [1, 2, 3], 'clone of a Buffer at the root keeps its bytes');

	t.end();
});

