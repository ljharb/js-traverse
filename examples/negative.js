#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

var fixed = Traverse([
    5, 6, -3, [ 7, 8, -2, 1 ], { f : 10, g : -13 }
]).modify(function (x) {
    if (x < 0) this.update(x + 128);
}).get()
sys.puts(sys.inspect(fixed));

/* Output:
    [ 5, 6, 125, [ 7, 8, 126, 1 ], { f: 10, g: 115 } ]
*/
