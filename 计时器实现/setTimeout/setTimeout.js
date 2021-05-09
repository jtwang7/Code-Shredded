/**
 * 利用 window.requestAnimationFrame() 自带的节流效果简单实现浏览器 setTimeout
 * 基于 requestAnimationFrame 实现 setTimeout 的原理:
 * 1. 大约每 16.7ms 检测时间是否到达设定阈值;
 * 2. requestAnimationFrame() 仅将回调推入队列, 并在特定时间节点触发, 因此不会死锁 JS 程序, JS 可执行其他同步操作;
 * @param {Function} callback - 回调函数
 * @param {Number} wait - 延迟时间
 * @param  {...any} args - 额外参数
 */
function mySetTimeout(callback, wait, ...args) {
  // 记录时间戳
  let prev = +new Date();
  let timer = null, now = null;
  
  let check = () => {
    // 将当前回调函数推入浏览器重绘的回调队列, 约 16.7ms 后执行(浏览器重绘频率/显示器刷新频率);
    timer = window.requestAnimationFrame(check);
    now = +new Date();
    // 判断 "当前时间戳 - 起始时间戳 >= 设定时间阈值"
    // 若 true, 执行回调并清除计时器
    // 若 false, 则经过系统时间间隔后, 执行 check, 再次检测是否到达设定时间阈值;
    if ((now - prev) >= wait) {
      callback.call(null, ...args);
      window.cancelAnimationFrame(timer);
    }
  }

  // 启动递归监测
  timer = window.requestAnimationFrame(check);
}

export default mySetTimeout
