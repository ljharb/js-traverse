#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

exports['traverse an object with nested functions'] = function (assert) {
    function Cons (x) {
        assert.equal(x, 10);
    };
    Traverse(new Cons(10));
};

