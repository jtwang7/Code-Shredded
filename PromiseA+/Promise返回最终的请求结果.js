// 模拟发送请求 ，只取最后一次的结果，前面的promise还没完成的话就取消

function wrap(callback) {
  let promises = []
  return function () {
    let p = callback();
    promises.push(p);
    return new Promise((resolve, reject) => {
      p.then(res => {
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