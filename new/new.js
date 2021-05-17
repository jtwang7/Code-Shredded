function _new(Fn, ...args) {
  // 创建 this 对象 + 添加至原型链
  let _this = Object.create(Fn);
  // 将 Fn 参数挂载至 this 对象，返回 Fn 执行的返回值
  let res = Fn.call(_this, ...args);
  if (typeof res === 'object') {
    // 若 Fn 返回一个自定义对象，则 this 对象被忽略
    return res;
  } else {
    // 否则返回 this 对象
    return _this;
  }
}