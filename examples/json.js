#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

var id = 54;
var callbacks = {};
var obj = { moo : function () {}, foo : [2,3,4, function () {}] };

var scrubbed = Traverse(obj).modify(function (x) {
    if (x instanceof Function) {
        callbacks[id] = { id : id, f : x, path : this.path };
        this.update('[Function]');
        id++;
    }
}).get();

sys.puts(JSON.stringify(scrubbed));
sys.puts(sys.inspect(callbacks));

/* Output:
    {"moo":"[Function]","foo":[2,3,4,"[Function]"]}
    { '54': { id: 54, f: [Function], path: [ 'moo' ] }
    , '55': { id: 55, f: [Function], path: [ 'foo', '3' ] }
    }
*/
