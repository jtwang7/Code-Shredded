export function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    // 防抖的关键: 每次执行前, 清除上一次的计时器并重新计时;
    if (timer) clearTimeout(timer);
    let callNow = !timer;
    // 重新计时;
    timer = setTimeout(()=>{
      timer = null;
    }, wait);
    if (callNow) {
      fn.call(ctx, ...args)
    }
  }
}