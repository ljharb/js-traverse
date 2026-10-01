'use strict';

var test = require('tape');
var v = require('es-value-fixtures');
var traverse = require('../');

var modes = {
	forEach: function (obj, cb) { return traverse(obj).forEach(cb); },
	map: function (obj, cb) { return traverse(obj).map(cb); },
	reduce: function (obj, cb) {
		return traverse(obj).reduce(function (acc, x) {
			cb.call(this, x);
			return acc;
		}, obj);
	},
	immutable: function (obj, cb) { return traverse(obj, { immutable: true }).forEach(cb); },
};
var allModes = ['forEach', 'map', 'reduce', 'immutable'];
var inPlaceModes = ['forEach', 'reduce'];
var returnValueModes = ['forEach', 'map', 'immutable'];

function isBad(x) {
	return typeof x === 'string' && x.indexOf('BAD') === 0;
}

function isBadArray(x) {
	return Array.isArray(x) && isBad(x[0]);
}

function removeBad(x) {
	if (isBad(x)) { this.remove(); }
}

function deleteBad(x) {
	if (isBad(x)) { this.delete(); }
}

function describe(x) {
	if (Array.isArray(x)) { return '[]'; }
	if (typeof x === 'function') { return 'fn'; }
	return x && typeof x === 'object' ? '{}' : String(x);
}

function walk(mode, input, cb) {
	var visits = [];
	var result = modes[mode](input, function (x) {
		if (!this.isRoot) { visits.push(this.path.join('.') + ':' + describe(x)); }
		return cb.call(this, x);
	});
	return { result: result, visits: visits.join(' ') };
}

function check(t, modeNames, makeInput, cb, expected, expectedVisits) {
	modeNames.forEach(function (mode) {
		var input = makeInput();
		var walked = walk(mode, input, cb);

		t.deepEqual(walked.result, expected, mode + ': result');
		t.equal(walked.visits, expectedVisits, mode + ': every child is visited once, in order, under its current key');

		if (inPlaceModes.indexOf(mode) > -1) {
			t.equal(walked.result, input, mode + ': changes the input in place');
		} else {
			t.deepEqual(input, makeInput(), mode + ': leaves the input alone');
		}
	});
}

function mixed() {
	return ['BAD1', 'ok1', 'BAD2', 'ok2', 'BAD3'];
}

test('remove: array elements', function (t) {
	check(t, allModes, mixed, removeBad, ['ok1', 'ok2'], '0:BAD1 0:ok1 1:BAD2 1:ok2 2:BAD3');

	check(
		t,
		allModes,
		function () { return ['BAD1', 'BAD2', 'BAD3', 'BAD4']; },
		removeBad,
		[],
		'0:BAD1 0:BAD2 0:BAD3 0:BAD4'
	);

	check(t, allModes, function () { return ['ok1', 'BAD1']; }, removeBad, ['ok1'], '0:ok1 1:BAD1');

	function fn() {}
	check(
		t,
		allModes,
		function () { return [fn, fn, 'a', fn]; },
		function (x) {
			if (typeof x === 'function') { this.remove(); }
		},
		['a'],
		'0:fn 0:fn 0:a 1:fn'
	);

	t.end();
});

test('remove: key and path of each array element', function (t) {
	allModes.forEach(function (mode) {
		var values = [];
		var keys = [];
		var paths = [];
		var result = modes[mode]([1, 2, 3, 4, 5], function (x) {
			if (!this.isRoot) {
				values.push(x);
				keys.push(this.key);
				paths.push(this.path);
			}
			if (x === 2) { this.remove(); }
		});

		t.deepEqual(result, [1, 3, 4, 5], mode + ': result');
		t.deepEqual(values, [1, 2, 3, 4, 5], mode + ': no element is skipped, and nothing past the end is visited');
		t.deepEqual(keys, ['0', '1', '1', '2', '3'], mode + ': keys are the indexes at the time of each visit');
		t.deepEqual(paths, [['0'], ['1'], ['1'], ['2'], ['3']], mode + ': paths are too');
	});

	t.end();
});

test('delete: array elements', function (t) {
	allModes.forEach(function (mode) {
		var all = walk(mode, ['BAD1', 'BAD2', 'BAD3', 'BAD4'], deleteBad);
		t.equal(all.visits, '0:BAD1 1:BAD2 2:BAD3 3:BAD4', mode + ': every element is visited once, under its original key');
		t.equal(all.result.length, 4, mode + ': nothing shifts');
		t.deepEqual(Object.keys(all.result), [], mode + ': every element is a hole');

		var some = walk(mode, mixed(), deleteBad);
		t.equal(some.visits, '0:BAD1 1:ok1 2:BAD2 3:ok2 4:BAD3', mode + ': survivors are visited under their original keys');
		t.equal(some.result.length, 5, mode + ': survivors do not shift');
		t.deepEqual(Object.keys(some.result), ['1', '3'], mode + ': survivors keep their slots');
	});

	t.end();
});

test('remove and delete: object with index-like keys', function (t) {
	[removeBad, deleteBad].forEach(function (cb) {
		check(
			t,
			allModes,
			function () { return { 0: 'BAD1', evil: 'BAD2', z: 'BAD3' }; },
			cb,
			{},
			'0:BAD1 evil:BAD2 z:BAD3'
		);

		check(
			t,
			allModes,
			function () { return { 0: 'BAD1', 1: 'ok1', 2: 'BAD2', 3: 'ok2' }; },
			cb,
			{ 1: 'ok1', 3: 'ok2' },
			'0:BAD1 1:ok1 2:BAD2 3:ok2'
		);
	});

	t.end();
});

test('remove: nested arrays where both levels remove', function (t) {
	check(
		t,
		allModes,
		function () {
			return [
				['BAD1', 'ok1', 'BAD2'],
				'BAD3',
				['BAD4'],
				['ok2', 'BAD5', 'ok3'],
				['BAD6', 'BAD7'],
			];
		},
		function (x) {
			if (isBad(x)) {
				this.remove();
			} else if (Array.isArray(x) && !this.isRoot) {
				this.after(function () {
					if (this.node.length === 0) { this.remove(); }
				});
			}
		},
		[['ok1'], ['ok2', 'ok3']],
		'0:[] 0.0:BAD1 0.0:ok1 0.1:BAD2 1:BAD3 1:[] 1.0:BAD4 1:[] 1.0:ok2 1.1:BAD5 1.1:ok3 2:[] 2.0:BAD6 2.0:BAD7'
	);

	t.end();
});

test('remove: survivors of a map are written back to their new slots', function (t) {
	var obj = [{ bad: true }, { n: 1 }, { bad: true }, { n: 2 }];
	var res = traverse(obj).map(function (x) {
		if (x && x.bad) { this.remove(); }
		if (typeof x === 'number') { this.update(x * 10); }
	});

	t.deepEqual(res, [{ n: 10 }, { n: 20 }]);
	t.deepEqual(obj, [{ bad: true }, { n: 1 }, { bad: true }, { n: 2 }]);

	t.end();
});

test('remove: from a hook', function (t) {
	function makeInput() {
		return ['BAD1', 'ok1', 'BAD2', 'ok2'];
	}
	var visits = '0:BAD1 0:ok1 1:BAD2 1:ok2';

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBad(x)) {
				this.before(function () { this.remove(); });
			}
		},
		['ok1', 'ok2'],
		visits
	);

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBad(x)) {
				this.after(function () { this.remove(); });
			}
		},
		['ok1', 'ok2'],
		visits
	);

	check(
		t,
		allModes,
		makeInput,
		function () {
			if (this.isRoot) {
				this.post(function (child) {
					if (isBad(child.node)) { child.remove(); }
				});
			}
		},
		['ok1', 'ok2'],
		visits
	);

	check(
		t,
		allModes,
		function () { return [['x'], ['BAD1', 'y'], ['z']]; },
		function (x) {
			if (isBadArray(x)) {
				this.pre(function (child, key) {
					if (key === '0') { this.remove(); }
				});
			}
		},
		[['x'], ['z']],
		'0:[] 0.0:x 1:[] 1.0:BAD1 1.1:y 1:[] 1.0:z'
	);

	t.end();
});

test('remove: a descendant removes its parent', function (t) {
	check(
		t,
		allModes,
		function () { return [{ bad: true, n: 1 }, { n: 2 }, { bad: true }, { n: 3 }]; },
		function () {
			if (this.key === 'bad') { this.parent.remove(); }
		},
		[{ n: 2 }, { n: 3 }],
		'0:{} 0.bad:true 0.n:1 0:{} 0.n:2 1:{} 1.bad:true 1:{} 1.n:3'
	);

	t.end();
});

test('remove: twice on the same node', function (t) {
	check(
		t,
		allModes,
		function () { return ['BAD1', 'ok1', 'ok2']; },
		function (x) {
			if (isBad(x)) {
				this.remove();
				this.remove();
			}
		},
		['ok1', 'ok2'],
		'0:BAD1 0:ok1 1:ok2'
	);

	check(
		t,
		allModes,
		function () { return [['BAD1', 'x'], ['ok1']]; },
		function (x) {
			if (isBadArray(x)) {
				this.remove();
				this.remove(true);
			}
		},
		[['ok1']],
		'0:[] 0:[] 0.0:ok1'
	);

	t.end();
});

test('remove: together with delete on the same node', function (t) {
	function makeInput() {
		return ['BAD1', 'ok1', 'ok2'];
	}
	function removeThenDelete(x) {
		if (isBad(x)) {
			this.remove();
			this.delete();
		}
	}

	check(t, allModes, makeInput, removeThenDelete, ['ok1', 'ok2'], '0:BAD1 0:ok1 1:ok2');

	allModes.forEach(function (mode) {
		t.deepEqual(
			Object.keys(walk(mode, makeInput(), removeThenDelete).result),
			['0', '1'],
			mode + ': the sibling that took its place is not deleted'
		);
	});

	check(
		t,
		allModes,
		function () { return [['BAD1', 'x'], ['ok1']]; },
		function (x) {
			if (isBadArray(x)) {
				this.remove();
				this.delete(true);
			}
		},
		[['ok1']],
		'0:[] 0:[] 0.0:ok1'
	);

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBad(x)) {
				this.delete();
				this.remove();
			}
		},
		['ok1', 'ok2'],
		'0:BAD1 0:ok1 1:ok2'
	);

	t.end();
});

test('remove: together with update on the same node', function (t) {
	function makeInput() {
		return [1, 2, 3];
	}

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (x === 2) {
				this.update(20);
				this.remove();
			}
		},
		[1, 3],
		'0:1 1:2 1:3'
	);

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (x === 2) {
				this.remove();
				this.update(20);
				t.equal(this.node, 20, 'the removed node itself is still updated');
			}
		},
		[1, 3],
		'0:1 1:2 1:3'
	);

	check(
		t,
		returnValueModes,
		function () { return ['BAD1', 'ok1', 'ok2']; },
		function (x) {
			if (isBad(x)) { this.remove(); }
			return this.isRoot ? undefined : x.toUpperCase();
		},
		['OK1', 'OK2'],
		'0:BAD1 0:ok1 1:ok2'
	);

	t.end();
});

test('delete: together with update on the same node', function (t) {
	function deleteThenUpdate(x) {
		if (x === 1) {
			this.delete();
			this.update(10);
		}
	}

	check(t, allModes, function () { return [1, 2, 3]; }, deleteThenUpdate, [10, 2, 3], '0:1 1:2 2:3');

	allModes.forEach(function (mode) {
		var result = walk(mode, { a: 1, b: 2 }, deleteThenUpdate).result;

		t.deepEqual(result, { a: 10, b: 2 }, mode + ': the slot is still its own, so it is filled again');
		t.deepEqual(Object.keys(result), ['b', 'a'], mode + ': as a new property');
	});

	t.end();
});

test('remove: circular references', function (t) {
	[false, true].forEach(function (immutable) {
		var obj = ['a'];
		obj.push(obj, 'b', obj, 'c');

		var visits = [];
		var result = traverse(obj, { immutable: immutable }).forEach(function (x) {
			if (!this.isRoot) { visits.push(this.key + ':' + describe(x)); }
			if (this.circular) { this.remove(); }
		});

		t.deepEqual(result, ['a', 'b', 'c'], 'immutable ' + immutable + ': result');
		t.equal(visits.join(' '), '0:a 1:[] 1:b 2:[] 2:c', 'immutable ' + immutable + ': visits');
		t.equal(obj.length, immutable ? 5 : 3, 'immutable ' + immutable + ': input');
	});

	t.end();
});

test('remove: stopHere, block and stop', function (t) {
	function makeInput() {
		return [['BAD1', 'a'], ['b'], ['BAD2', 'c'], ['d']];
	}

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBadArray(x)) { this.remove(); }
		},
		[['b'], ['d']],
		'0:[] 0.0:BAD1 0.1:a 0:[] 0.0:b 1:[] 1.0:BAD2 1.1:c 1:[] 1.0:d'
	);

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBadArray(x)) { this.remove(true); }
		},
		[['b'], ['d']],
		'0:[] 0:[] 0.0:b 1:[] 1:[] 1.0:d'
	);

	check(
		t,
		allModes,
		makeInput,
		function (x) {
			if (isBadArray(x)) {
				this.remove();
				this.block();
			}
		},
		[['b'], ['d']],
		'0:[] 0:[] 0.0:b 1:[] 1:[] 1.0:d'
	);

	check(
		t,
		allModes,
		mixed,
		function (x) {
			if (isBad(x)) {
				this.remove();
				this.stop();
			}
		},
		['ok1', 'BAD2', 'ok2', 'BAD3'],
		'0:BAD1'
	);

	t.end();
});

test('remove: isFirst and isLast', function (t) {
	allModes.forEach(function (mode) {
		var flags = [];
		modes[mode](['BAD1', 'ok1', 'BAD2'], function (x) {
			if (this.isRoot) {
				this.post(function (child) {
					flags.push([child.node, child.isFirst, child.isLast]);
				});
			}
			removeBad.call(this, x);
		});

		t.deepEqual(
			flags,
			[
				['BAD1', true, false],
				['ok1', false, false],
				['BAD2', false, true],
			],
			mode + ': go by position among the keys the walk started with'
		);
	});

	t.end();
});

test('remove: sparse array', function (t) {
	allModes.forEach(function (mode) {
		var input = ['a', 'BAD1', 'b'];
		input[5] = 'c';
		var walked = walk(mode, input, removeBad);

		t.equal(walked.visits, '0:a 1:BAD1 1:b 4:c', mode + ': holes shift along with everything else');
		t.equal(walked.result.length, 5, mode + ': length');
		t.deepEqual(Object.keys(walked.result), ['0', '1', '4'], mode + ': keys');
		t.equal(walked.result[4], 'c', mode + ': last element');
	});

	t.end();
});

test('remove: non-index property of an array', function (t) {
	allModes.forEach(function (mode) {
		var input = ['BAD1', 'a'];
		input.extra = 'BAD2';
		var walked = walk(mode, input, removeBad);

		t.equal(walked.visits, '0:BAD1 0:a extra:BAD2', mode + ': its key never shifts');
		t.deepEqual(Object.keys(walked.result), ['0'], mode + ': it is deleted rather than spliced');
		t.equal(walked.result[0], 'a', mode + ': no element is removed in its stead');
	});

	var obj = ['a', 'b'];
	obj.extra = 'BAD';
	traverse(obj).forEach(removeBad);
	t.deepEqual(Object.keys(obj), ['0', '1'], 'likewise when nothing was spliced before it');

	t.end();
});

test('remove: number-like non-index properties of an array', function (t) {
	var names = [
		'01',
		'1.5',
		'-1',
		'4294967295',
	];

	names.forEach(function (name) {
		allModes.forEach(function (mode) {
			var input = ['BAD1', 'a'];
			input[name] = 'x';
			var walked = walk(mode, input, removeBad);

			t.equal(walked.visits, '0:BAD1 0:a ' + name + ':x', mode + ': ' + name + ': its key never shifts');
			t.equal(walked.result[name], 'x', mode + ': ' + name + ': it is kept');
		});

		var obj = ['a', 'b'];
		obj[name] = 'BAD';
		traverse(obj).forEach(removeBad);
		t.deepEqual(Object.keys(obj), ['0', '1'], name + ': it is deleted rather than spliced');
	});

	t.end();
});

test('remove: symbol property of an array', { skip: !v.hasSymbols }, function (t) {
	var sym = Symbol('extra');

	[false, true].forEach(function (immutable) {
		var obj = ['BAD1', 'a'];
		obj[sym] = 'BAD2';

		var keys = [];
		var result = traverse(obj, { immutable: immutable, includeSymbols: true }).forEach(function (x) {
			if (!this.isRoot) { keys.push(this.key); }
			removeBad.call(this, x);
		});

		t.deepEqual(keys, ['0', '0', sym], 'immutable ' + immutable + ': its key never shifts');
		t.deepEqual(result, ['a'], 'immutable ' + immutable + ': elements');
		t.deepEqual(Object.getOwnPropertySymbols(result), [], 'immutable ' + immutable + ': it is deleted rather than spliced');
	});

	t.end();
});

test('remove: custom keys', function (t) {
	inPlaceModes.forEach(function (mode) {
		var reordered = walk(mode, ['BAD1', 'ok1', 'BAD2', 'ok2'], function (x) {
			if (this.isRoot) { this.keys = ['2', '0', '3', '1']; }
			removeBad.call(this, x);
		});
		t.deepEqual(reordered.result, ['ok1', 'ok2'], mode + ': reordered: result');
		t.equal(reordered.visits, '2:BAD2 0:BAD1 1:ok2 0:ok1', mode + ': reordered: only keys after a removed element shift');

		var repeated = walk(mode, ['BAD1', 'ok1'], function (x) {
			if (this.isRoot) { this.keys = ['0', '0', '1']; }
			removeBad.call(this, x);
		});
		t.deepEqual(repeated.result, ['ok1'], mode + ': repeated: result');
		t.equal(repeated.visits, '0:BAD1 0:ok1', mode + ': repeated: a removed child is not visited again, nor a sibling in its place');

		var keys = [];
		var result = modes[mode](['BAD1', 'ok1', 'ok2'], function (x) {
			if (this.isRoot) {
				this.keys = [0, 1, 2];
			} else {
				keys.push(this.key);
			}
			removeBad.call(this, x);
		});
		t.deepEqual(result, ['ok1', 'ok2'], mode + ': numeric: result');
		t.deepEqual(keys, [0, 0, 1], mode + ': numeric: shifted keys stay numbers');
	});

	t.end();
});

test('remove: after the traversal', function (t) {
	function collect(obj) {
		var contexts = [];
		traverse(obj).forEach(function (x) {
			if (isBad(x)) { contexts.push(this); }
		});
		return contexts;
	}

	var forwards = mixed();
	collect(forwards).forEach(function (context) { context.remove(); });
	t.deepEqual(forwards, ['ok1', 'ok2'], 'in the order visited');

	var backwards = mixed();
	collect(backwards).reverse().forEach(function (context) { context.remove(); });
	t.deepEqual(backwards, ['ok1', 'ok2'], 'in reverse');

	t.end();
});

test('remove and delete: removedKeys', function (t) {
	var removed = [];
	traverse({ a: 'BAD1', b: ['BAD2', 'ok1', 'BAD3'], c: 'BAD4' }).forEach(function (x) {
		t.equal(typeof this.removedKeys, 'object', 'is present on every context');

		if (!this.isLeaf) {
			this.after(function () {
				removed.push(Object.keys(this.removedKeys));
			});
		}
		if (this.key === 'c') {
			this.delete();
		} else {
			removeBad.call(this, x);
		}
	});

	t.deepEqual(removed, [['0', '1'], ['a', 'c']], 'records the key each removal happened at');

	t.end();
});
