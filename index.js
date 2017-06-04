'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var wrapFn = function wrapFn(fn, task) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new task(function (rej, res) {
      var cb = function cb(err, contents) {
        return err ? rej(err) : res(contents);
      };
      fn.apply(null, [].concat(args, [cb]));
    });
  };
};

function taskify(arg, task, options) {
  if (!task) throw Error('Please pass a Task data type as second argument of taskify.');
  if (typeof arg === 'function') {
    return wrapFn(arg, task);
  } else {
    return Object.getOwnPropertyNames(arg).filter(function (key) {
      return arg.hasOwnProperty(key);
    }).map(function (key) {
      var val = arg[key];
      var isFunction = typeof val === 'function';
      var isSuitableFn = !key.match(/.+(Sync|Stream)$/);
      if (isFunction && isSuitableFn) {
        return [key, wrapFn(val, task)];
      }
      return [key, val];
    }).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      acc[key] = value;
      return acc;
    }, {});
  }
}

module.exports = taskify;
