console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

/**输出结果
 * 1
 * 
 */


/**过程解析
 * 首轮构建执行上下文(入队)
 * js 代码块作为异步代码入队
 * console.log(1) 同步代码, 进入主线程
 * setTimeout 异步宏任务, 注册其 function(){...} (不关心其嵌套) 至宏任务队列
 * process.nextTick 异步微任务, 注册回调并添加至微任务队列
 * new Promise 内部 executor 函数同步执行, 添加至主线程
 * .then() 异步微任务, 添加至微任务队列
 * setTimeout 异步宏任务, 注册其 function(){...} (不关心其嵌套) 至宏任务队列
 * 
 * 首轮执行(出队)
 * 清空主线程: 输出 1, 7
 * 清空微任务队列: 输出 6, 8
 * 获取宏任务第一个回调并执行: 输出 2, 此时遇到 process.nextTick, 开启第二轮入队(构建执行环境)
 * 
 *   第二轮入队
 *   注册 process.nextTick 回调并添加至微任务队列, 
 *   添加 new Promise 内同步代码至主线程, 
 *   注册 .then() 回调至微任务; 此时主线程和微任务队列都不为空, 开启第二轮出队
 * 
 *   第二轮出队
 *   清空主线程: 输出 4
 *   清空微任务队列: 输出 3, 5
 *   获取宏任务下一个回调: 输出 9,  此时遇到 process.nextTick, 开启第三轮入队
 * 
 *     第三轮入队
 *     注册 process.nextTick 回调并添加至微任务队列, 
 *     添加 new Promise 内同步代码至主线程, 
 *     注册 .then() 回调至微任务; 此时主线程和微任务队列都不为空, 开启第三轮出队
 * 
 *     第三轮出队
 *     清空主线程: 输出 11;
 *     清空微任务队列: 输出 10, 12
 * 
 * 主线程, 宏任务队列, 微任务队列都为空, 执行完毕
 * 输出结果为: 1, 7, 6, 8, 2, 4, 3, 5, 9, 11, 10, 12
 */