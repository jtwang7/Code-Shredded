export function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const ctx = this; // 保存 this 指向
    if (timer) clearTimeout(timer); // 防抖的关键: 每次执行前, 清除上一次的计时器并重新计时;
    let callNow = !timer; // 开关：决定是否执行回调
    // 重新计时;
    timer = setTimeout(()=>{
      timer = null;
    }, wait);
    // timer 为 null 时执行回调
    if (callNow) {
      fn.call(ctx, ...args)
    }
  }
}