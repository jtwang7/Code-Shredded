console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

/**请写出打印结果
 * script start
 * script end
 * promise1
 * promise2
 * setTimeout
 */

/**过程解析
 * 添加执行环境 - 任务入栈:
 * 最开始 JS 整体代码作为异步输入
 * console.log('script start') 同步代码, 放入主线程队列
 * setTimeout 异步宏任务, 经 Event Table 注册回调后, 其回调放入宏任务队列
 * Promise.resolve() 异步微任务, 经 Event Table 注册回调后, 回调放入微任务队列 (Promise 由于链式调用, 微任务队列 promise1 先入, promise2 后入)
 * console.log('script end') 同步代码, 放入主线程队列
 * 
 * 执行 - 任务出栈:
 * 先执行主线程, 输出 script start, script end
 * 主线程为空, 清除微任务队列, 微任务回调出队列, 进入主线程执行, 输出 promise1, promise2
 * 微任务为空, 清除宏任务队列, 宏任务回调出队列, 进入主线程执行, 输出 setTimeout
 * 主线程, 任务队列均为空, 执行完毕;
 */