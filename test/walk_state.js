'use strict';

var test = require('tape');
var traverse = require('../');

function idFirst(a, b) {
	var aA = [a === 'id' ? 0 : 1, a];
	var bA = [b === 'id' ? 0 : 1, b];
	return aA < bA ? -1 : aA > bA ? 1 : 0;
}

function leaves(t, method, cb) {
	var acc = [];
	t[method](function (node) {
		cb.call(this, node);
		if (this.isLeaf) { acc.push(node); }
	});
	return acc.join(' ');
}

test('keys assigned in before() are honoured', function (t) {
	['forEach', 'map'].forEach(function (method) {
		var obj = { a: 30, b: 22, id: 9 };
		t.equal(leaves(traverse(obj), method, function () {
			if (this.isRoot) {
				this.before(function (n) {
					this.keys = Object.keys(n).sort(idFirst);
				});
			}
		}), '9 30 22', method);
	});
	t.end();
});

test('keys assigned in the callback are honoured', function (t) {
	['forEach', 'map'].forEach(function (method) {
		var obj = { a: 30, b: 22, id: 9 };
		t.equal(leaves(traverse(obj), method, function () {
			if (this.isRoot) { this.keys = ['id']; }
		}), '9', method);
	});
	t.end();
});

test('a replaced node is walked with its own keys', function (t) {
	['forEach', 'map'].forEach(function (method) {
		var visited = [];
		var res = traverse({ a: { x: 1 } })[method](function (node) {
			visited.push(this.path.join('.') + '=' + JSON.stringify(node));
			if (this.key === 'a') { this.update({ y: 2, z: 3 }); }
		});
		t.same(res, { a: { y: 2, z: 3 } }, method);
		t.same(visited, [
			'={"a":{"x":1}}',
			'a={"x":1}',
			'a.y=2',
			'a.z=3',
		], method);
	});
	t.end();
});

test('a node is not its own circular', function (t) {
	['forEach', 'map'].forEach(function (method) {
		var seen = [];
		traverse({ a: { b: 1 } })[method](function () {
			var key = this.path.join('.');
			if (this.notRoot) {
				seen.push(key + ' parent:' + this.parent.circular);
			}
			this.after(function () {
				seen.push(key + ':' + this.circular);
			});
		});
		t.same(seen, [
			'a parent:null',
			'a.b parent:null',
			'a.b:null',
			'a:null',
			':null',
		], method);
	});

	var obj = { x: [] };
	obj.x.push(obj);
	var found = [];
	traverse(obj).forEach(function () {
		if (this.circular) {
			found.push(this.path.join('.') + '->' + this.circular.path.join('.'));
		}
	});
	t.same(found, ['x.0->']);

	t.end();
});

test('keys assigned in the callback are kept when it updates to the node or its original', function (t) {
	['forEach', 'map'].forEach(function (method) {
		['node', 'node_'].forEach(function (which) {
			var obj = { a: 1, b: 2 };
			var res = traverse(obj)[method](function () {
				if (this.isRoot) {
					this.keys = ['a'];
					this.update(this[which]);
				} else {
					this.update(this.node * 10);
				}
			});
			t.same(method === 'map' ? res : obj, { a: 10, b: 2 }, method + ' ' + which);
		});
	});
	t.end();
});

test('a node with children is not a leaf when the callback assigns no keys', function (t) {
	['forEach', 'map'].forEach(function (method) {
		var seen = [];
		traverse({ a: 1 })[method](function () {
			if (this.isRoot) {
				this.keys = [];
				this.after(function () {
					seen.push(this.isLeaf, this.notLeaf);
				});
			}
		});
		t.same(seen, [false, true], method);
	});
	t.end();
});
