function throttle(func, wait) {
  // 计时器和时间戳初始化
  let timer = null, pre = 0;

  const mainFunc = function () {
    let context = this;
    let args = [...arguments];

    let now = +new Date();
    // 此处逻辑可能有点绕, 可以先把时间戳和计时器的实现都先写出来, 再调整逻辑
    if(now - pre > wait) {
      // 执行时间戳, 则屏蔽计时器方法, 即清除计时器并置为 null
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // 正常的时间戳方法
      func.apply(context, args);
      pre = now;
    } else if (!timer) {
      // 若时间戳不执行了, 此时 timer 为 null, 触发计时器方法执行
      // 注意: 计时器计时时间是剩余时间而不是设置的阈值
      timer = setTimeout(()=>{
        // 重置时间戳
        pre = +new Date()

        timer = null;
        func.apply(context, args);
      }, wait-(now - pre))
    }
  }

  return mainFunc
}