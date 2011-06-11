var traverse = require('traverse');
var assert = require('assert');

exports.subexpr = function () {
    var obj = [ 'a', 4, 'b', 5, 'c', 6 ];
    var r = traverse(obj).map(function (x) {
        if (typeof x === 'number') {
            this.update([ x - 0.1, x, x + 0.1 ]);
        }
    });
};
