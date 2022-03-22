// 模拟发送请求 ，只取最后一次的结果，前面的promise还没完成的话就取消

// 首先根据题意知：warp()接收一个函数，该函数返回Promise对象。wrap()返回一个函数，该函数也返回一个Promise。
function wrap(callback) {
  // YOUR CODE
  let promises = [] // 存储Promise对象
  return function () {
    let p = callback(); // 将所有Promise的executor都先执行，但暂时不处理和传递结果
    promises.push(p); // 存储
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
      // 判断是否满足条件
      // 此处判断条件要放在 p.then() 内部，利用事件循环机制，让所有Promise都注册完成后，再执行对应的then函数。
      p.then(res => {
        // 若promise是最后一个promise对象，则获取它的结果，并传递出去
        if (promises.findIndex(promise => promise === p) === (promises.length - 1)) {
          resolve(res);
        }
      }, err => {
        if (promises.findIndex(promise => promise === p) === (promises.length - 1)) {
          reject(err);
        }
      })
    })
  }
}

let count = 0;
function sendRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(++count)
    })
  });
}
let newWrap = wrap(sendRequest);
newWrap().then(console.log)
newWrap().then(console.log)
newWrap().then(console.log) //输出3