#!/usr/bin/env node
var sys = require('sys');
var Hash = require('traverse/hash');

exports['flat traversal with the hash lib'] = function (assert) {
    var ref1 = { a : 1, b : 2 };
    var hash1 = Hash(ref1).map(function (v) { return v + 1 }).end;
    assert.equal(ref1.a, 1);
    assert.equal(ref1.b, 2);
    assert.equal(hash1.a, 2);
    assert.equal(hash1.b, 3);
    
    var ref2 = { foo : [1,2], bar : [4,5] };
    var hash2 = Hash.map(ref2, function (v) { v.unshift(v[0] - 1); return v });
    assert.equal(ref2.foo.join(' '), '1 2');
    assert.equal(ref2.bar.join(' '), '4 5');
    assert.equal(hash2.foo.join(' '), '0 1 2');
    assert.equal(hash2.bar.join(' '), '3 4 5');
};

