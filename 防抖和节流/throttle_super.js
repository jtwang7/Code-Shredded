// 完整的 throttle 节流实现: 可控制是否第一次立即执行, 以及是否在末尾执行回调
// 设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调

function throttle(func, wait, options={}) {
  let timer = null, pre = 0;

  // 不能同时设置禁用第一次执行和末尾回调
  if ((options.leading === false) && (options.trailing === false)) {
    throw new Error('options 参数不能同时为 true')
  }

  let mainFunc =  function() {
    const context = this;
    const args = [...arguments];

    let now = +new Date();
    // 通过控制 pre 来控制是否第一次执行
    // 当 pre == 0 且禁用第一次执行时, 让 pre == now, 就不执行第一次的时间戳方法了
    // pre == 0 用于区分第一次时间戳方法和后续时间戳方法, 若只有 options.leading === false, 时间戳就被永久禁用了
    if (!pre && options.leading === false) pre = now;
    if (now - pre > wait) {
      // 重置计时器方法
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(context, args);
      pre = now;
    } else if (!timer && options.trailing !== false) {
      // options.trailing !== false 时才开放计时器方法
      timer = setTimeout(()=>{
        // 重置时间戳方法
        // 当禁用第一次执行时, 时间戳要重置回 0
        pre = options.leading === false ? 0 : +new Date();

        // timer 类似于开关, null 时表示可以执行下一次回调了
        timer = null;
        func.apply(context, args)
      }, wait-(now-pre))
    }
  }

  // 取消节流功能: 参数初始化
  mainFunc.cancel = function() {
    pre = 0;
    clearTimeout(timer);
    timer = null;
  }

  return mainFunc;
}