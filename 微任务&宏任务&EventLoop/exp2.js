setTimeout(()=>{
  console.log('setTimeout1');
}, 0);

let p = new Promise((resolve, reject)=>{
  console.log('Promise1');
  resolve();
})

p.then(()=>{
  console.log('Promise2');
})


/**请写出打印结果
 * Promise1
 * Promise2
 * setTimeout1
 */

/**过程解析
 * 入队
 * 最开始 JS 整体代码作为异步输入
 * setTimeout 异步宏任务, 注册回调并添加至宏任务
 * new Promise 是同步任务, 其内部 executor 函数在主线程自动执行, 因此将 executor 函数添加至主线程;
 * Promise.then() 异步微任务, 注册回调并添加至微任务
 * 
 * 出队
 * 清空主线程, 输出 Promise1;
 * 清空微任务队列, 输出 Promise2;
 * 取宏任务队列回调, 输出 setTimeout1;
 */