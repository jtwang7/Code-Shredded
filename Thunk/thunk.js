// JS 中 thunk 函数用于将一个多参数函数, 替换成一个只接受回调函数作为参数的单参数函数;

// 接收一个目标函数
function thunk(fn) {
  // 返回一个函数, 用于接收除回调以外的所有参数
  return function (...args) {
    // 返回一个函数, 用于接收回调函数参数
    return function (callback) {
      // 参数及回调函数都已经接收完毕, 再一次调用函数立即执行 fn 并返回结果;
      return fn.call(this, ...args, callback);
    }
  }
}


// test
const fn = function (wait, callback) {
  setTimeout(callback, wait)
}
let thunkFunc = thunk(fn)(1000);
thunkFunc(() => {
  console.log('success');
})
