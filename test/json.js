#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

exports['json test'] = function (assert) {
    var id = 54;
    var callbacks = {};
    var obj = { moo : function () {}, foo : [2,3,4, function () {}] };
    
    var scrubbed = Traverse(obj).map(function (x) {
        if (x instanceof Function) {
            callbacks[id] = { id : id, f : x, path : this.path };
            this.update('[Function]');
            id++;
        }
    }).value;
    
    assert.equal(
        scrubbed.moo, '[Function]',
        'obj.moo replaced with "[Function]"'
    );
    assert.equal(
        scrubbed.foo[3], '[Function]',
        'obj.foo[3] replaced with "[Function]"'
    )
    assert.equal(
        JSON.stringify(scrubbed),
        '{"moo":"[Function]","foo":[2,3,4,"[Function]"]}',
        'Full JSON string matches'
    );
    assert.equal(
        typeof obj.moo, 'function',
        'Original obj.moo still a function'
    );
    assert.equal(
        typeof obj.foo[3], 'function',
        'Original obj.foo[3] still a function'
    );
    assert.equal(
        sys.inspect(callbacks),
        "{ '54': { id: 54, f: [Function], path: [ 'moo' ] }\n"
        + ", '55': { id: 55, f: [Function], path: [ 'foo', '3' ] }\n}",
        'Check the generated callbacks list'
    );
};

