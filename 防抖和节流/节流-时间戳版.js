export function throttle(fn, interval) {
  let pre = 0; // 初始化时间戳;
  return function (...args) {
    const ctx = this;
    let now = new Date().getTime(); // 获取函数执行时的时间戳;
    // 用时间差值作为函数执行开关;
    if (now - pre > interval) {
      fn.call(ctx, ...args);
      pre = new Date().getTime(); // 更新时间戳;
    }
  }
}