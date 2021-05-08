// 与防抖最主要区别在于: 不需要在每次执行函数前清除计时器;
export function throttle(fn, interval) {
  let timer = null; // 初始化计时器;
  return function (...args) {
    const ctx = this;
    // 将计时器作为函数执行的开关;
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(ctx, ...args); // 执行函数;
        timer = null; // 重置开关;
      }, interval)
    }
  }
}