export function throttle(fn, interval) {
  let timer = null, pre = 0; // 初始化时间戳和计时器;
  return function (...args) {
    const ctx = this;

    let now = new Date().getTime();
    // 若满足 now - pre, 函数执行时间戳版;
    // now - pre 不满足, 则会执行计时器版;
    if (now - pre > interval) {
      fn.call(ctx, ...args);
      pre = new Date().getTime();
      // 执行时间戳版时, 需要初始化计时器版;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.call(ctx, ...args);
        timer = null;
        // 执行计时器版, 需要初始化时间戳版;
        pre = new Date().getTime();
      }, interval - (now - pre))
    }
  }
}