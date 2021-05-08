export function throttle(fn, interval, option={first:false, last:true}) {
  const {first, last} = option;
  if (first && last) {
    throw new Error('options 参数不能同时为 true')
  }

  let timer = null, pre = 0;
  return function (...args) {
    const ctx = this;

    let now = new Date().getTime();
    if (!pre && first) pre = now; // 时间戳处于初始状态且首调禁用时;
    if (now - pre > interval) {
      fn.call(ctx, ...args);
      pre = new Date().getTime();
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    } else if (!timer && !last) { // 尾调禁用;
      timer = setTimeout(() => {
        fn.call(ctx, ...args);
        timer = null;
        pre = first ? 0 : new Date().getTime(); // 首调禁用时, 时间戳应初始化为 0;
      }, interval - (now - pre))
    }
  }
}