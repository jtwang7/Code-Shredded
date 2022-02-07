export function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    if (timer) {
      // 清除前一次计时器;
      clearTimeout(timer);
      timer = null;
    }
    // 重新计时;
    timer = setTimeout(()=>{
      fn.call(ctx, ...args)
    }, wait)
  }
}