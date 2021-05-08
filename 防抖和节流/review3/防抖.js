export function debounce(fn, wait, immediate = false) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(()=>{
        timer = null;
      },wait)
      if (callNow) {
        fn.call(ctx, ...args);
      }
    } else {
      timer = setTimeout(() => {
        fn.call(ctx, ...args);
        timer = null;
      }, wait);
    }
  }
}