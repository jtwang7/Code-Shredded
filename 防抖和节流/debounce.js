function debounce(func, wait, immediate = false) {
  let timer = null, result = null;
  let mainFunc =  function () {
    const context = this;
    const args = [...arguments];

    if (timer) { clearTimeout(timer) };
    if (immediate) {
      // 立即执行: 和非立即执行(简易版)相反即可;
      // 当 timer 为 null 时, 可立即执行; 同时创建计时器, 计时完成后再将 timer 置为 null;
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        // 立即执行可以返回函数值, 非立即执行不可以;
        // 因为 setTimeout() 中还未完成 result 赋值, result 就被返回了, 值为 undefined;
        result = func.apply(context, args);
      } 
    } else {
      // 同简易版防抖
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait)
    }
    return result;
  }

  // 取消防抖功能
  mainFunc.cancel = function() {
    // 清除现有计时器, 并将计时器初始化为null;
    clearTimeout(timer);
    timer = null;
    // console.log(timer);
  }

  return mainFunc;
}