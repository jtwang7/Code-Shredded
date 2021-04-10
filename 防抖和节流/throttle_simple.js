// 时间戳节流法: 立即执行第一次
function throttle(func, wait) {
  // 初始化时间
  let time = 0;
  return function() {
    const context = this;
    const args = [...arguments];

    // 获得当前时间戳
    let now = +new Date();
    // 时间差 > 阈值, 则触发函数; 由于第一次的时间差必定大于阈值, 所以第一次立即执行
    if(now - time > wait) {
      // console.log(now);
      func.apply(context, args);
      // 更新时间戳
      time = now;
    }
  }
}