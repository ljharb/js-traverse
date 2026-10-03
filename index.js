var whichTypedArray = require('which-typed-array');
var taSlice = require('typedarray.prototype.slice');
var gopd = require('gopd');
var defineDataProperty = require('define-data-property');
var ToPropertyKey = require('es-abstract/2025/ToPropertyKey');

// TODO: use call-bind, is-date, is-regex, is-string, is-boolean-object, is-number-object
function toS(obj) { return Object.prototype.toString.call(obj); }
function isDate(obj) { return toS(obj) === '[object Date]'; }
function isRegExp(obj) { return toS(obj) === '[object RegExp]'; }
function isError(obj) { return toS(obj) === '[object Error]'; }
function isBoolean(obj) { return toS(obj) === '[object Boolean]'; }
function isNumber(obj) { return toS(obj) === '[object Number]'; }
function isString(obj) { return toS(obj) === '[object String]'; }

// TODO: use isarray
var isArray = Array.isArray || function isArray(xs) {
	return Object.prototype.toString.call(xs) === '[object Array]';
};

// TODO: use for-each?
function forEach(xs, fn) {
	if (xs.forEach) { return xs.forEach(fn); }
	for (var i = 0; i < xs.length; i++) {
		fn(xs[i], i, xs);
	}
	return void undefined;
}

// TODO: use object-keys
var objectKeys = Object.keys || function keys(obj) {
	var res = [];
	for (var key in obj) { res[res.length] = key; } // eslint-disable-line no-restricted-syntax
	return res;
};

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
var getOwnPropertySymbols = Object.getOwnPropertySymbols; // eslint-disable-line id-length

// TODO: use reflect.ownkeys and filter out non-enumerables
function ownEnumerableKeys(obj) {
	var res = objectKeys(obj);

	// Include enumerable symbol properties.
	if (getOwnPropertySymbols) {
		var symbols = getOwnPropertySymbols(obj);
		for (var i = 0; i < symbols.length; i++) {
			if (propertyIsEnumerable.call(obj, symbols[i])) {
				res[res.length] = symbols[i];
			}
		}
	}
	return res;
}

// TODO: use object.hasown
var hasOwnProperty = Object.prototype.hasOwnProperty || function (obj, key) {
	return key in obj;
};

function isWritable(object, key) {
	if (typeof gopd !== 'function') {
		return true;
	}

	var desc = gopd(object, key);
	return !desc || !desc.writable;
}

var maxArrayLength = 4294967295;

function isIndex(key) {
	if (typeof key === 'symbol') {
		return false;
	}
	var index = Number(key);
	return index >= 0
		&& index < maxArrayLength
		&& index % 1 === 0
		&& String(index) === String(key);
}

function countBelow(ascending, index) {
	var low = 0;
	var high = ascending.length;
	while (low < high) {
		var middle = Math.floor((low + high) / 2);
		if (ascending[middle] < index) {
			low = middle + 1;
		} else {
			high = middle;
		}
	}
	return low;
}

// While an array's children are walked, `spliced` holds, in ascending order, the index that each
// child spliced out of it so far had when that walk began. This is enough to tell which children
// are gone, and where each remaining one is now, however many went away and in whatever order.
// Nothing but a splice moves a child, so for every other kind of parent `spliced` stays empty.
function wasSpliced(key, spliced) {
	return spliced.length > 0
		&& isIndex(key)
		&& spliced[countBelow(spliced, Number(key))] === Number(key);
}

function shiftedKey(key, spliced) {
	if (spliced.length === 0 || !isIndex(key)) {
		return key;
	}
	var shifted = Number(key) - countBelow(spliced, Number(key));
	return typeof key === 'number' ? shifted : String(shifted);
}

// where `__proto__` is an accessor on Object.prototype, assigning it on an object
// that lacks it as an own property replaces the [[Prototype]], instead of creating it.
// in older engines it is magic on every object, so there is no own `__proto__` to preserve.
var hasProtoAccessor = typeof gopd === 'function' && !!gopd(Object.prototype, '__proto__');

function setProperty(object, key, value) {
	if (hasProtoAccessor && key === '__proto__' && !hasOwnProperty.call(object, key)) {
		defineDataProperty(object, key, value);
	} else {
		object[key] = value; // eslint-disable-line no-param-reassign
	}
}

// where `__proto__` is magic, reading or assigning it only ever reaches the [[Prototype]],
// even on an object that has it as an own property.
var hasMagicProto = !hasProtoAccessor && {}.__proto__ === Object.prototype;

function toSettableKey(segment) {
	// a segment that is an object would otherwise be coerced anew on every use, and need not produce the same key each time
	var key = ToPropertyKey(segment);
	if (hasMagicProto && key === '__proto__') {
		throw new TypeError('`__proto__` can not be set as a property in this engine');
	}
	return key;
}

function setOwnProperty(object, key, value) {
	'use strict';

	// this file is sloppy, so the assignment is repeated here, where a failed one throws
	if (hasProtoAccessor && key === '__proto__' && !hasOwnProperty.call(object, key)) {
		defineDataProperty(object, key, value);
	} else {
		object[key] = value; // eslint-disable-line no-param-reassign
	}
	// a primitive can not gain an own property; when assigning one does not throw,
	// the property would be read from, or written to, a built-in prototype
	if (Object(object) !== object) {
		throw new TypeError('Cannot create property `' + String(key) + '` on a ' + typeof object);
	}
}

function copy(src, options) {
	if (typeof src === 'object' && src !== null) {
		var dst;

		if (isArray(src)) {
			dst = [];
		} else if (isDate(src)) {
			dst = new Date(src.getTime ? src.getTime() : src);
		} else if (isRegExp(src)) {
			dst = new RegExp(src);
		} else if (isBoolean(src) || isNumber(src) || isString(src)) {
			dst = Object(src);
		} else {
			var ta = whichTypedArray(src);
			if (ta) {
				return taSlice(src);
			} else if (Object.create && Object.getPrototypeOf) {
				dst = Object.create(Object.getPrototypeOf(src));
			} else if (src.constructor === Object) {
				dst = {};
			} else {
				var proto = (src.constructor && src.constructor.prototype)
					|| src.__proto__
					|| {};
				var T = function T() {}; // eslint-disable-line func-style, func-name-matching
				T.prototype = proto;
				dst = new T();
			}
		}

		// an Error's message is usually its own non-enumerable property,
		// so the keys below leave it out
		if (isError(src)) { defineDataProperty(dst, 'message', src.message); }

		var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
		forEach(iteratorFunction(src), function (key) {
			setProperty(dst, key, src[key]);
		});
		return dst;
	}
	return src;
}

/** @type {TraverseOptions} */
var emptyNull = { __proto__: null };

function walk(root, cb) {
	var path = [];
	var parents = [];
	var alive = true;
	var options = arguments.length > 2 ? arguments[2] : emptyNull;
	var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
	var immutable = !!options.immutable;

	return (function walker(node_, splicedSiblings, originalKey) {
		var node = immutable ? copy(node_, options) : node_;
		var modifiers = { __proto__: null };

		var keepGoing = true;

		var state = {
			node: node,
			node_: node_,
			path: [].concat(path),
			parent: parents[parents.length - 1],
			parents: parents,
			key: path[path.length - 1],
			removedKeys: { __proto__: null },
			isRoot: path.length === 0,
			level: path.length,
			circular: null,
			update: function (x, stopHere) {
				// once this node is spliced out, its key belongs to whichever sibling took its place
				if (!state.isRoot && !wasSpliced(originalKey, splicedSiblings)) {
					setProperty(state.parent.node, state.key, x);
				}
				state.node = x;
				if (stopHere) { keepGoing = false; }
			},
			delete: function (stopHere) {
				if (!wasSpliced(originalKey, splicedSiblings)) {
					delete state.parent.node[state.key];
					state.parent.removedKeys[state.key] = true;
				}
				if (stopHere) { keepGoing = false; }
			},
			remove: function (stopHere) {
				if (isArray(state.parent.node) && isIndex(originalKey)) {
					var index = Number(originalKey);
					var at = countBelow(splicedSiblings, index);
					// once this node is spliced out, its slot holds the next sibling still there,
					// and removing again removes that one, as it always has
					while (splicedSiblings[at] === index) {
						index += 1;
						at += 1;
					}
					if (index - at < state.parent.node.length) {
						state.parent.node.splice(index - at, 1);
						splicedSiblings.splice(at, 0, index);
						state.parent.removedKeys[state.key] = true;
					}
					if (stopHere) { keepGoing = false; }
				} else {
					state.delete(stopHere);
				}
			},
			keys: null,
			before: function (f) { modifiers.before = f; },
			after: function (f) { modifiers.after = f; },
			pre: function (f) { modifiers.pre = f; },
			post: function (f) { modifiers.post = f; },
			stop: function () { alive = false; },
			block: function () { keepGoing = false; },
		};

		if (!alive) { return state; }

		function updateState() {
			if (typeof state.node === 'object' && state.node !== null) {
				var nodeKeys = iteratorFunction(state.node);
				// keys assigned by the callback are kept unless it replaced the node with a new object
				if (!state.keys || (state.node !== node && state.node !== node_)) {
					state.keys = nodeKeys;
				}

				// a node whose children the callback chose not to visit is still not a leaf
				state.isLeaf = nodeKeys.length === 0;

				for (var i = 0; i < parents.length; i++) {
					if (parents[i].node_ === node_) {
						state.circular = parents[i];
						break; // eslint-disable-line no-restricted-syntax
					}
				}
			} else {
				state.isLeaf = true;
				state.keys = null;
			}

			state.notLeaf = !state.isLeaf;
			state.notRoot = !state.isRoot;
		}

		updateState();

		// use return values to update if defined
		var ret = cb.call(state, state.node);
		if (ret !== undefined && state.update) { state.update(ret); }

		if (modifiers.before) { modifiers.before.call(state, state.node); }

		if (!keepGoing) { return state; }

		if (
			typeof state.node === 'object'
			&& state.node !== null
			&& !state.circular
		) {
			// before this node is among the parents, so it is not its own circular
			updateState();

			parents[parents.length] = state;

			var splicedChildren = [];

			forEach(state.keys, function (listedKey, i) {
				// a child can only be gone before its turn if custom `keys` list it more than once
				if (wasSpliced(listedKey, splicedChildren)) { return; }

				var key = shiftedKey(listedKey, splicedChildren);

				path[path.length] = (key);

				if (modifiers.pre) { modifiers.pre.call(state, state.node[key], key); }

				var child = walker(state.node[key], splicedChildren, listedKey);

				if (immutable && !wasSpliced(listedKey, splicedChildren)) {
					// not `key`: a sibling spliced during this child's walk will have moved it
					var writeKey = shiftedKey(listedKey, splicedChildren);
					if (
						hasOwnProperty.call(state.node, writeKey)
						&& !isWritable(state.node, writeKey)
					) {
						state.node[writeKey] = child.node;
					}
				}

				child.isLast = i === state.keys.length - 1;
				child.isFirst = i === 0;

				if (modifiers.post) { modifiers.post.call(state, child); }

				path.pop();
			});
			parents.pop();
		}

		if (modifiers.after) { modifiers.after.call(state, state.node); }

		return state;
	}(root, [])).node;
}

/** @typedef {{ immutable?: boolean, includeSymbols?: boolean }} TraverseOptions */

/**
 * A traverse constructor
 * @param {object} obj - the object to traverse
 * @param {TraverseOptions | undefined} [options] - options for the traverse
 * @constructor
 */
function Traverse(obj) {
	if (!(this instanceof Traverse)) {
		return new Traverse(obj, arguments.length > 1 ? arguments[1] : emptyNull);
	}
	/** @type {TraverseOptions} */
	this.options = arguments.length > 1 ? arguments[1] : emptyNull;
	this.value = obj;
}

/** @type {(ps: PropertyKey[]) => Traverse['value']} */
Traverse.prototype.get = function (ps) {
	var node = this.value;
	for (var i = 0; node && i < ps.length; i++) {
		var key = ps[i];
		// a symbol path segment is looked up whether or not `includeSymbols` is set
		if (!hasOwnProperty.call(node, key)) {
			return void undefined;
		}
		node = node[key];
	}
	return node;
};

/** @type {(ps: PropertyKey[]) => boolean} */
Traverse.prototype.has = function (ps) {
	var node = this.value;
	// TODO: remove ps.length check
	if (!node && ps.length > 0) {
		return false;
	}
	for (var i = 0; node && i < ps.length; i++) {
		var key = ps[i];
		if (!hasOwnProperty.call(node, key)) {
			return false;
		}
		node = node[key];
	}
	return true;
};

Traverse.prototype.set = function (ps, value) {
	var node = this.value;
	for (var i = 0; i < ps.length - 1; i++) {
		var key = toSettableKey(ps[i]);
		if (!hasOwnProperty.call(node, key)) {
			setOwnProperty(node, key, {});
			// an inherited setter, or a Proxy, can accept the assignment without creating the property;
			// the next node would then be read from wherever the key is inherited from
			if (!hasOwnProperty.call(node, key)) {
				throw new TypeError('Cannot create property `' + String(key) + '` as an own property');
			}
		}
		node = node[key];
	}
	setOwnProperty(node, toSettableKey(ps[i]), value);
	return value;
};

Traverse.prototype.map = function (cb) {
	return walk(this.value, cb, { __proto__: null, immutable: true, includeSymbols: !!this.options.includeSymbols });
};

Traverse.prototype.forEach = function (cb) {
	this.value = walk(this.value, cb, this.options);
	return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
	var skip = arguments.length === 1;
	var acc = skip ? this.value : init;
	this.forEach(function (x) {
		if (!this.isRoot || !skip) {
			acc = cb.call(this, acc, x);
		}
	});
	return acc;
};

Traverse.prototype.deepEqual = function (obj) {
	if (arguments.length !== 1) {
		throw new Error('deepEqual requires exactly one object to compare against');
	}

	var equal = true;
	function notEqual() {
		equal = false;
		// this.stop();
		return undefined;
	}

	var node = obj;

	this.forEach(function (y) { // eslint-disable-line consistent-return, max-statements

		// if (node === undefined || node === null) return notEqual();

		if (!this.isRoot) {
			/*
            if (!Object.hasOwnProperty.call(node, this.key)) {
                return notEqual();
            }
        */
			if (typeof node !== 'object') { return notEqual(); }
			node = node[this.key];
		}

		var x = node;

		this.post(function () {
			node = x;
		});

		if (this.circular) {
			if (new Traverse(obj).get(this.circular.path) !== x) { notEqual(); }
		} else if (typeof x !== typeof y) {
			notEqual();
		} else if (x === null || y === null || x === undefined || y === undefined) {
			if (x !== y) { notEqual(); }
		} else if (x.__proto__ !== y.__proto__) {
			notEqual();
		} else if (x === y) {
			// nop
		} else if (typeof x === 'function') {
			if (x instanceof RegExp) {
				// both regexps on account of the __proto__ check
				if (String(x) !== String(y)) { notEqual(); }
			} else if (x !== y) { notEqual(); }
		} else if (typeof x === 'object') {
			if (toS(y) === '[object Arguments]'
            || toS(x) === '[object Arguments]') {
				if (toS(x) !== toS(y)) {
					notEqual();
				}
			} else if (toS(y) === '[object RegExp]'
            || toS(x) === '[object RegExp]') {
				if (!x || !y || x.toString() !== y.toString()) { notEqual(); }
			} else if (x instanceof Date || y instanceof Date) {
				if (!(x instanceof Date) || !(y instanceof Date)
                || x.getTime() !== y.getTime()) {
					notEqual();
				}
			} else {
				var kx = Object.keys(x);
				var ky = Object.keys(y);
				if (kx.length !== ky.length) { return notEqual(); }
				for (var i = 0; i < kx.length; i++) {
					var k = kx[i];
					if (!Object.hasOwnProperty.call(y, k)) {
						notEqual();
					}
				}
			}
		}
	});

	return equal;
};

Traverse.prototype.paths = function () {
	var acc = [];
	this.forEach(function () {
		acc[acc.length] = this.path;
	});
	return acc;
};

Traverse.prototype.nodes = function () {
	var acc = [];
	this.forEach(function () {
		acc[acc.length] = this.node;
	});
	return acc;
};

Traverse.prototype.clone = function () {
	var parents = [];
	var nodes = [];
	var options = this.options;

	if (whichTypedArray(this.value)) {
		return taSlice(this.value);
	}

	return (function clone(src) {
		for (var i = 0; i < parents.length; i++) {
			if (parents[i] === src) {
				return nodes[i];
			}
		}

		if (typeof src === 'object' && src !== null) {
			var dst = copy(src, options);

			parents[parents.length] = (src);
			nodes[nodes.length] = (dst);

			var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
			forEach(iteratorFunction(src), function (key) {
				setProperty(dst, key, clone(src[key]));
			});

			parents.pop();
			nodes.pop();
			return dst;
		}

		return src;

	}(this.value));
};

// TODO: replace with object.assign?
forEach(ownEnumerableKeys(Traverse.prototype), function (key) {
	Traverse[key] = function (obj) {
		var args = [].slice.call(arguments, 1);
		var t = new Traverse(obj);
		return t[key].apply(t, args);
	};
});

module.exports = Traverse;
