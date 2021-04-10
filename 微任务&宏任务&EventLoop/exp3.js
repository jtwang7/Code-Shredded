Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
});

setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)

/**输出结果
 * Promise1
 * setTimeout1
 * Promise2
 * setTimeout2
 */

/**过程解析
 * 入队
 * 最开始 JS 整体代码作为异步输入
 * Promise.resolve() 异步微任务, 注册回调并添加至微任务
 * setTimeout 异步宏任务, 注册回调并添加至宏任务
 * 
 * 出队
 * 主线程没有任务, 清空微任务, 输出 Promise1, 此时碰到 setTimeout 宏任务;
 * 
 * 入队
 * setTimeout 注册回调并添加至宏任务队尾
 * 
 * 出队
 * 微任务为空, 此时获取宏任务队列最开始的回调并执行, 输出 setTimeout1;
 * 
 * 入队
 * 遇到 Promise.resolve 异步微任务, 注册其回调并添加至微任务;
 * 
 * 出队
 * 下一次宏任务队列回调执行前, 必须保证微任务队列是清空的, 因此此时清空微任务回调, 输出 Promise2
 * (这就是宏任务不用清空这两个字的原因)
 * 清空后, 获取宏任务回调并执行, 输出 setTimeout2
 */