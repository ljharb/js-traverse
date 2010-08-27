#!/usr/bin/env node
var sys = require('sys');
var Hash = require('traverse/hash');

exports.map = function (assert) {
    var ref = { a : 1, b : 2 };
    var hash = Hash(ref).map(function (v) { return v + 1 }).end;
    assert.equal(ref.a, 1);
    assert.equal(ref.b, 2);
    assert.equal(hash.a, 2);
    assert.equal(hash.b, 3);
};

exports['cloned map'] = function (assert) {
    var ref = { foo : [1,2], bar : [4,5] };
    var hash = Hash(ref).clone.map(
        function (v) { v.unshift(v[0] - 1); return v }
    ).items;
    assert.equal(ref.foo.join(' '), '1 2');
    assert.equal(ref.bar.join(' '), '4 5');
    assert.equal(hash.foo.join(' '), '0 1 2');
    assert.equal(hash.bar.join(' '), '3 4 5');
};

exports.reduce = function (assert) {
    var ref = { foo : [1,2], bar : [4,5] };
    
    var sum1 = Hash(ref).reduce(function (acc, v) {
        return acc + v.length
    }, 0);
    assert.equal(sum1, 4);
    
    var sum2 = Hash.reduce(ref, function (acc, v) {
        return acc + v.length
    }, 0);
    assert.equal(sum2, 4);
};

exports['filter and values'] = function (assert) {
    var ref = { a : 5, b : 2, c : 7, 1337 : 'leet' };
    var hash = Hash(ref).filter(function (v, k) { return v > 5 || k > 5 });
    assert.equal(hash.keys.sort().join(' '), '1337 c');
    assert.equal(Hash(ref).keys.sort().join(' '), '1337 a b c');
    assert.equal(Hash(ref).values.sort().join(' '), '2 5 7 leet');
    assert.equal(Hash(ref).length, 4);
};

exports.concat = function (assert) {
    var ref1 = { a : 1, b : 2 };
    var ref2 = { foo : 100, bar : 200 };
    
    assert.equal(
        Object.keys(Hash.concat([ ref1, ref2 ])).sort().join(' '),
        'a b bar foo'
    );
};

exports.update = function (assert) {
    var ref = { a : 1, b : 2 };
    var hash = Hash(ref).clone;
    var updated = hash.update({ c : 3, a : 0 });
    assert.equal(updated.keys.sort().join(' '), 'a b c');
    assert.equal(updated.items.a, 0);
    assert.equal(updated.items.b, 2);
    assert.equal(updated.items.c, 3);
    assert.equal(hash.keys.sort().join(' '), 'a b c');
    assert.equal(hash.items.a, 0);
    assert.equal(hash.items.b, 2);
    assert.equal(hash.items.c, 3);
    assert.equal(Object.keys(ref).sort().join(' '), 'a b');
    assert.equal(ref.a, 1);
    assert.equal(ref.b, 2);
};

exports.merge = function (assert) {
    var ref = { a : 1, b : 2 };
    var hash = Hash(ref).clone;
    var merged = hash.merge({ c : 3.14, d : 4 });
    assert.equal(merged.items.a, 1);
    assert.equal(merged.items.b, 2);
    assert.equal(merged.items.c, 3.14);
    assert.equal(merged.items.d, 4);
    assert.equal(merged.length, 4);
    assert.equal(hash.keys.sort().join(' '), 'a b');
    assert.equal(hash.length, 2);
};

exports.extract = function (assert) {
    var hash = Hash({ a : 1, b : 2, c : 3 }).clone;
    var extracted = hash.extract(['a','b']);
    assert.equal(extracted.length, 2);
    assert.equal(extracted.items.a, 1);
    assert.equal(extracted.items.b, 2);
    
    assert.equal(hash.valuesAt(['a','b']).join(' '), '1 2');
};

