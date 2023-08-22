'use strict';

var test = require('tape');
var traverse = require('../');

test('traverse an UInt8Array', { skip: typeof Uint8Array !== 'function' }, function (t) {
	var obj = Uint8Array.from('test');
	var results = traverse(obj).map(function () {});
	t.same(results, obj);
	t.end();
});

