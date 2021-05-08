function _new (Fn, ...args) {
  let _this = Object.create(Fn);
  let res = Fn.call(_this, ...args);
  if (typeof res === 'object') {
    return res;
  } else {
    return _this;
  }
}