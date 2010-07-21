#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

var acc = [];
Traverse({
    a : [1,2,3],
    b : 4,
    c : [5,6],
    d : { e : [7,8], f : 9 }
}).forEach(function (x) {
    if (this.isLeaf) acc.push(x);
});
sys.puts(acc.join(' '));

/* Output:
    1 2 3 4 5 6 7 8 9
*/
