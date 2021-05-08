function debounce(fn, wait, immediate) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    timer && clearTimeout(timer)
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(()=>{
        timer = null;
      }, wait)
      if (callNow) fn.call(ctx, args);
    } else {
      timer = setTimeout(()=>{
        fn.call(ctx, args)
      }, wait)
    }
  }
}

