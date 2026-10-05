'use strict';

var test = require('tape');
var traverse = require('../');

test('get and has through a falsy node', function (t) {
	t.equal(traverse({ a: null }).get(['a', 'b']), undefined, 'get through null is undefined');
	t.equal(traverse({ a: null }).has(['a', 'b']), false, 'has through null is false');

	t.equal(traverse({ a: undefined }).get(['a', 'b']), undefined, 'get through undefined is undefined');
	t.equal(traverse({ a: undefined }).has(['a', 'b']), false, 'has through undefined is false');

	t.equal(traverse({ a: 0 }).get(['a', 'b']), undefined, 'get through 0 is undefined');
	t.equal(traverse({ a: 0 }).has(['a', 'b']), false, 'has through 0 is false');

	t.equal(traverse({ a: false }).get(['a', 'valueOf']), undefined, 'get of an inherited property through false is undefined');
	t.equal(traverse({ a: false }).has(['a', 'valueOf']), false, 'has of an inherited property through false is false');

	t.equal(traverse({ a: '' }).get(['a', 'length']), 0, 'get of an own property of an empty string');
	t.equal(traverse({ a: '' }).has(['a', 'length']), true, 'has of an own property of an empty string');

	t.equal(traverse(null).get(['a']), undefined, 'get through a null root is undefined');
	t.equal(traverse(null).has(['a']), false, 'has through a null root is false');

	t.equal(traverse({ a: null }).get(['a']), null, 'get of a null value is null');
	t.equal(traverse({ a: null }).has(['a']), true, 'has of a null value is true');

	t.end();
});
