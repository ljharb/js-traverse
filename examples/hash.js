#!/usr/bin/env node

var Hash = require('traverse/hash');
var sys = require('sys');

var obj = Hash({ a : 1, b : 2 })
    .map(function (v) { return v + 1 })
    .update({ b : 30, c : 42 })
    .filter(function (v) { return v % 2 == 0 })
    .tap(function () {
        var anyC = this.some(function (value, key) { return key == 'c' });
        // or just this.keys.some, but anyways
        console.log(anyC
            ? "There's a C key this far."
            : "There's no C key this far."
        );
    })
    .items
;

/*  Output:
    There's a C key this far.
    { a : 2, b : 30, c : 42 }
*/
console.log(sys.inspect(obj));
