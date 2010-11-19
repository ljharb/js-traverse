#!/usr/bin/env node
var Hash = require('traverse/hash');

exports.map = function (assert) {
    var ref = { a : 1, b : 2 };
    var items = Hash(ref).map(function (v) { return v + 1 }).items;
    var hash = Hash.map(ref, function (v) { return v + 1 });
    assert.deepEqual(ref, { a : 1, b : 2 });
    assert.deepEqual(items, { a : 2, b : 3 });
    assert.deepEqual(hash, { a : 2, b : 3 });
};

exports['cloned map'] = function (assert) {
    var ref = { foo : [1,2], bar : [4,5] };
    var hash = Hash(ref).clone.map(
        function (v) { v.unshift(v[0] - 1); return v }
    ).items;
    assert.deepEqual(ref.foo, [1,2]);
    assert.deepEqual(ref.bar, [4,5]);
    assert.deepEqual(hash.foo, [0,1,2]);
    assert.deepEqual(hash.bar, [3,4,5]);
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
    var items = Hash(ref).filter(function (v, k) {
        return v > 5 || k > 5
    }).items;
    var hash = Hash.filter(ref, function (v, k) { return v > 5 || k > 5 });
    assert.deepEqual(items, { 1337 : 'leet', c : 7 });
    assert.deepEqual(hash, { 1337 : 'leet', c : 7 });
    assert.deepEqual(ref, { a : 5, b : 2, c : 7, 1337 : 'leet' });
    assert.equal(Hash(ref).length, 4);
};

exports.length = function (assert) {
    assert.equal(Hash({ a : 1, b : [2,3], c : 4 }).length, 3);
    assert.equal(Hash({ a : 1, b : [2,3], c : 4 }).size, 3);
    assert.equal(Hash.size({ a : 1, b : [2,3], c : 4 }), 3);
};

exports.concat = function (assert) {
    var ref1 = { a : 1, b : 2 };
    var ref2 = { foo : 100, bar : 200 };
    var ref3 = { b : 3, c : 4, bar : 300 };
    
    assert.deepEqual(
        Hash.concat([ ref1, ref2 ]),
        { a : 1, b : 2, foo : 100, bar : 200 }
    );
    
    assert.deepEqual(
        Hash.concat([ ref1, ref2, ref3 ]),
        { a : 1, b : 3, c : 4, foo : 100, bar : 300 }
    );
};

exports.update = function (assert) {
    var ref = { a : 1, b : 2 };
    var items = Hash(ref).clone.update({ c : 3, a : 0 }).items;
    assert.deepEqual(ref, { a : 1, b : 2 });
    assert.deepEqual(items, { a : 0, b : 2, c : 3 });
    
    var hash = Hash.update(ref, { c : 3, a : 0 });
    assert.deepEqual(ref, hash);
    assert.deepEqual(hash, { a : 0, b : 2, c : 3 });
};

exports.merge = function (assert) {
    var ref = { a : 1, b : 2 };
    var items = Hash(ref).merge({ b : 3, c : 3.14 }).items;
    var hash = Hash.merge(ref, { b : 3, c : 3.14 });
    
    assert.deepEqual(ref, { a : 1, b : 2 });
    assert.deepEqual(items, { a : 1, b : 3, c : 3.14 });
    assert.deepEqual(hash, { a : 1, b : 3, c : 3.14 });
};

exports.extract = function (assert) {
    var hash = Hash({ a : 1, b : 2, c : 3 }).clone;
    var extracted = hash.extract(['a','b']);
    assert.equal(extracted.length, 2);
    assert.deepEqual(extracted.items, { a : 1, b : 2 });
};

exports.exclude = function (assert) {
    var hash = Hash({ a : 1, b : 2, c : 3 }).clone;
    var extracted = hash.exclude(['a','b']);
    assert.equal(extracted.length, 1);
    assert.deepEqual(extracted.items, { c : 3 });
};

exports.compact = function (assert) {
    var hash = {
        a : 1,
        b : undefined,
        c : false,
        d : 4,
        e : [ undefined, 4 ],
        f : null
    };
    var compacted = Hash(hash).compact;
    assert.deepEqual(
        {
            a : 1,
            b : undefined,
            c : false,
            d : 4,
            e : [ undefined, 4 ],
            f : null
        },
        hash, 'compact modified the hash'
    );
    assert.deepEqual(
        compacted.items,
        {
            a : 1,
            c : false,
            d : 4,
            e : [ undefined, 4 ],
            f : null
        }
    );
    var h = Hash.compact(hash);
    assert.deepEqual(h, compacted.items);
};

exports.valuesAt = function (assert) {
    var h = { a : 4, b : 5, c : 6 };
    assert.equal(Hash(h).valuesAt('a'), 4);
    assert.equal(Hash(h).valuesAt(['a'])[0], 4);
    assert.deepEqual(Hash(h).valuesAt(['a','b']), [4,5]);
    assert.equal(Hash.valuesAt(h, 'a'), 4);
    assert.deepEqual(Hash.valuesAt(h, ['a']), [4]);
    assert.deepEqual(Hash.valuesAt(h, ['a','b']), [4,5]);
};

exports.zip = function (assert) {
    var xs = ['a','b','c'];
    var ys = [1,2,3,4];
    var h = Hash(xs,ys);
    assert.equal(h.length, 3);
    assert.deepEqual(h.items, { a : 1, b : 2, c : 3 });
    
    var zipped = Hash.zip(xs,ys);
    assert.deepEqual(zipped, { a : 1, b : 2, c : 3 });
};

exports.has = function (assert) {
    var h = { a : 4, b : 5 };
    var hh = Hash(h);
    
    assert.ok(hh.has('a'));
    assert.equal(hh.has('c'), false);
    assert.ok(hh.has(['a','b']));
    assert.equal(hh.has(['a','b','c']), false);
    
    assert.ok(Hash.has(h, 'a'));
    assert.equal(Hash.has(h, 'c'), false);
    assert.ok(Hash.has(h, ['a','b']));
    assert.equal(Hash.has(h, ['a','b','c']), false);
};

exports.detect = function (assert) {
    var h = { a : 5, b : 6, c : 7, d : 8 };
    var hh = Hash(h);
    var gt6hh = hh.detect(function (x) { return x > 6 });
    assert.ok(gt6hh == 7 || gt6hh == 8);
    var gt6h = Hash.detect(h, function (x) { return x > 6 });
    assert.ok(gt6h == 7 || gt6h == 8);
    assert.equal(hh.detect(function (x) { return x > 100 }), undefined);
};
