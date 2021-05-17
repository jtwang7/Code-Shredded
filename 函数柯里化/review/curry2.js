/**
 * 函数柯里化
 * @param {Function} fn - 柯里化的目标函数
 * @param {Array} arr - 存储已传入参数的数组，默认值为 []
 * @returns 返回柯里化后的函数
 */
function curry(fn, arr=[]) {
  // Function.length：获取函数的形参个数（第一个默认值之前的参数个数）
  let lens = fn.length;
  return function (...args) {
    // 将接收的参数存入数组
    arr = arr.concat(args);
    if(arr.length < lens) {
      // 若参数未完全传入，递归执行函数柯里化
      return curry.call(this, fn, arr);
    } else {
      // 若参数完全传入，执行 fn
      return fn.call(this, ...arr);
    }
  }
}


// test
function add(a, b, c, d = 4) {
  return a + b + c + d
}
console.log('原始函数: ' + add(1, 2, 3, 4));

const curryFunc = curry(add);
console.log('函数柯里化: ' + curryFunc(1)(2)(3));