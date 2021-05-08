export function throttle(fn, interval) {
  let timer = null, pre = 0;
  return function (...args) {
    const ctx = this;

    let now = new Date().getTime();
    if (now - pre > interval) {
      if (!timer) {
        clearTimeout(timer);
        timer = null;
      };
      
      fn.call(ctx, ...args);
      pre = new Date().getTime();
    } else if (!timer) {
      timer = setTimeout(() => {
        pre = new Date().getTime();

        fn.call(ctx, ...args);
        timer = null;
      }, interval - (now - pre))
    }
  }
}