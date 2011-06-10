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
