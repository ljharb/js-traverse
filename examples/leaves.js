'use strict';

var traverse = require('traverse');

var obj = {
	a: [1, 2, 3],
	b: 4,
	c: [5, 6],
	d: { e: [7, 8], f: 9 },
};

var leaves = traverse(obj).reduce(function (acc, x) {
	if (this.isLeaf) { acc.push(x); }
	return acc;
}, []);

console.dir(leaves);
