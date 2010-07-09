Description
===========
Traverse and transform objects by visiting every node on a recursive walk.

Examples
========

JSON Scrubbing Example
----------------------

Suppose you have a complex data structure that you want to send to another
process with JSON over a network socket. If the data structure has references to
functions in it, JSON will convert functions inside Arrays to null and ignore
keys that map to functions inside Objects.

    > JSON.stringify([ 7, 8, function () {}, 9, { b : 4, c : function () {} } ])
    '[7,8,null,9,{"b":4}]'

If these nested functions are important, it'd be nice if they could be collected
and replaced with some placeholder value that JSON can encapsulate. This sort of
transform and collection might be useful for
[an asynchronous remote method invocation library
](http://github.com/substack/dnode), for instance.

This example scrubs functions out of an arbitrary data structure so that the
structure may be JSON-ified. The functions are also collected for some other
use.
    
    var sys = require('sys');
    var Traverse = require('traverse').Traverse;
    
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
