function _new(Fn, ...args) {
  let $this = Object.create(Fn);
  let res = Fn.call($this, ...args);
  // if (typeof res === 'object') {
  //   return res;
  // } else {
  //   return $this;
  // }
  return typeof res === 'object' ? res : $this;
}