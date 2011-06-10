var assert = require('assert');
var traverse = require('traverse');

exports.stop = function () {
    var visits = 0;
    traverse('abcdefghij'.split('')).forEach(function (node) {
        if (typeof node === 'string') {
            visits ++;
            if (node === 'e') this.stop()
        }
    });
    
    assert.equal(visits, 5);
};

exports.stopMap = function () {
    var s = traverse('abcdefghij'.split('')).map(function (node) {
        if (typeof node === 'string') {
            if (node === 'e') this.stop()
            return node.toUpperCase();
        }
    }).join('');
    
    assert.equal(s, 'ABCDEfghij');
};
