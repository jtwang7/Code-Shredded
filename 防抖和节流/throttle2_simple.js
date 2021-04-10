// 定时器节流法: 停止后执行最后一次
function throttle2(func, wait) {
  let timer = null;

  return function () {
    const context = this;
    const args = [...arguments];

    if (!timer) {
      timer = setTimeout(()=>{
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  }
}