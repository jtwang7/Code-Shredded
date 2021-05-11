function mySetInterval(callback, interval) {
  function check() {
    // 主要处理代码
    callback.call(null); 
    // 递归
    // 存储 timer 计时器至 mySetInterval (函数类型本质是对象)，方便清除
    mySetInterval.timer = setTimeout(check, interval);
  }
  // 开启计时递归
  mySetInterval.timer = setTimeout(check, interval);
}

// 清除 timer
mySetInterval.clear = function() {
  clearTimeout(mySetInterval.timer)
}

export default mySetInterval;

/**
 * 周期性调度的两种方法：
 * 1. 嵌套 setTimeout
 * 2. setInterval
 * 
 * 参考：https://zh.javascript.info/settimeout-setinterval
 * 两者区别：
 * 嵌套的 setTimeout 能够精确地设置两次执行之间的延时，而 setInterval 却不能。
 * 
 * 原因：
 * setInterval 每隔一个时间阈值会将回调推入宏队列，此时立即会开始下一次计时。即 setInterval 控制的是回调推入队列的时间，而不是回调执行的时间。
 * 假设主线程没有阻塞，setInterval 的回调被立即执行，回调执行所用的时间也会被计算在 setInterval 时间阈值内，导致使用 setInterval 时，回调函数的实际调用间隔要比代码中设定的时间间隔要短。
 * setTimeout 嵌套实现，会在回调执行完毕后才重新设置计时器，将下一个回调推入队列，因此每一次回调执行的间隔与设定时间阈值近似（存在一定的系统误差）。
 */