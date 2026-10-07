var traverse = require('traverse');
var assert = require('assert');

exports.subexpr = function () {
    var obj = [ 'a', 4, 'b', 5, 'c', 6 ];
    var r = traverse(obj).map(function (x) {
        if (typeof x === 'number') {
            this.update([ x - 0.1, x, x + 0.1 ]);
        }
    });
    
    assert.deepEqual(obj, [ 'a', 4, 'b', 5, 'c', 6 ]);
    assert.deepEqual(r, [
        'a', [ 3.9, 4, 4.1 ],
        'b', [ 4.9, 5, 5.1 ],
        'c', [ 5.9, 6, 6.1 ],
    ]);
};
