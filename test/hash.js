#!/usr/bin/env node
var sys = require('sys');
var Hash = require('traverse/hash');

exports['hash traversal'] = function (assert) {
    var ref1 = { a : 1, b : 2 };
    var hash1 = Hash(ref1).map(function (v) { return v + 1 }).end;
    assert.equal(ref1.a, 1);
    assert.equal(ref1.b, 2);
    assert.equal(hash1.a, 2);
    assert.equal(hash1.b, 3);
    
    var ref2 = { foo : [1,2], bar : [4,5] };
    var hash2 = Hash(ref2).clone.map(
        function (v) { v.unshift(v[0] - 1); return v }
    ).items;
    assert.equal(ref2.foo.join(' '), '1 2');
    assert.equal(ref2.bar.join(' '), '4 5');
    assert.equal(hash2.foo.join(' '), '0 1 2');
    assert.equal(hash2.bar.join(' '), '3 4 5');
    
    var sum1 = Hash(ref2).reduce(function (acc, v) {
        return acc + v.length
    }, 0);
    assert.equal(sum1, 4);
    
    var sum2 = Hash.reduce(ref2, function (acc, v) {
        return acc + v.length
    }, 0);
    assert.equal(sum2, 4);
    
    var ref3 = { a : 5, b : 2, c : 7, 1337 : 'leet' };
    var f1 = Hash.filter(ref3, function (v, k) { return v > 5 || k > 5 });
    assert.equal(Object.keys(f1).sort().join(' '), '1337 c');
    
    assert.equal(Hash(ref3).keys.sort().join(' '), '1337 a b c');
    assert.equal(Hash(ref3).values.sort().join(' '), '2 5 7 leet');
    
    assert.equal(Hash(ref3).length, 4);
};

