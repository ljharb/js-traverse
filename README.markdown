Description
===========
Traverse and transform objects by visiting every node on a recursive walk.

Installation
============

Using npm:
    npm install traverse

Or check out the repository and link your development copy:
    git clone http://github.com/substack/js-traverse.git
    cd js-traverse
    npm link .

You can test traverse with "expresso":http://github.com/visionmedia/expresso
(`npm install expresso`):
    js-traverse $ expresso
    
    100% wahoo, your stuff is not broken!
    

Examples
========

These examples use node.js, but the module should work without it.

Collect Leaf Nodes
------------------
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

Replace Negative Numbers
------------------------
    var sys = require('sys');
    var Traverse = require('traverse');
    
    var numbers = [ 5, 6, -3, [ 7, 8, -2, 1 ], { f : 10, g : -13 } ];
    var fixed = Traverse.map(numbers, function (x) {
        if (typeof x == 'number' && x < 0) this.update(x + 128);
    });
    sys.puts(sys.inspect(fixed));
    
    /* Output:
        [ 5, 6, 124, [ 7, 8, 125, 1 ], { f: 10, g: 114 } ]
    */

Scrub and Collect Functions
---------------------------

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
    var Traverse = require('traverse');
    
    var id = 54;
    var callbacks = {};
    var obj = { moo : function () {}, foo : [2,3,4, function () {}] };
    
    var scrubbed = Traverse.map(obj, function (x) {
        if (typeof x == 'function') {
            callbacks[id] = { id : id, f : x, path : this.path };
            this.update('[Function]');
            id++;
        }
    });
    
    sys.puts(JSON.stringify(scrubbed));
    sys.puts(sys.inspect(callbacks));
    
    /* Output:
        {"moo":"[Function]","foo":[2,3,4,"[Function]"]}
        { '54': { id: 54, f: [Function], path: [ 'moo' ] }
        , '55': { id: 55, f: [Function], path: [ 'foo', '3' ] }
        }
    */

Hash Transforms
===============

There's also a hash lib in this distribution with tons of useful functions to
operate on hashes:

map, forEach, filter, reduce, some, update, merge, tap, valuesAt, extract,
items, keys, values, clone, copy

These work mostly like their array counterparts where available except they get
an extra second argument, key.

Other functions like tap, valuesAt, merge, and update work like their ruby
counterparts.

The extract function creates a hash with only the supplied keys in it.

The clone property makes a deep copy with Traversable.clone() and the copy
property makes a shallow copy.

The items property is the hash with the Hash() wrapper peeled away.




    > var Hash = require('traverse/hash')
    > Hash({ a : 1, b : 2 }).map(function (v) { return v + 1 }).items
    { a: 2, b: 3 }
    
To do the same thing without chaining:

    > Hash.map({ a : 1, b : 2 }, function (v) { return v + 1 })
    { a: 2, b: 3 }

The 'this' context of the function calls is the same object that the chained
functions return, so you can make nested chains.

See also [creationix's pattern/hash](http://github.com/creationix/pattern),
which does a similar thing except with hash inputs and array outputs.
