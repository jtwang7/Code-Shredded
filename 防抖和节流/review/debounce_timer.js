// 非立即执行版
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(ctx, ...args)
    }, wait)
  }
}