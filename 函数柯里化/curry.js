// 函数柯里化
/**
 * curry
 * @param {Function} fn // 接收被柯里化的目标函数名
 * @param {Array} arr // 存储已传递的参数
 * @returns // 若函数参数未传递满, 则返回函数接收剩余参数; 若传递完成则执行目标函数
 */
function curry(fn, arr = []) {
  // fn.length <=> arguments.callee.length : 获取函数形参个数(不包含默认值)
  let lens = fn.length;
  // 返回一个函数接受剩余参数
  return function func(...args) {
    // 将剩余参数拼接到参数列表
    arr = arr.concat(args)
    if (arr.length < lens) {
      // 注意此处若用 apply, 需要将多个参数用 [] 包裹, 因为 apply 参数只能接受数组或类数组对象
      // call 接收多个参数, 并通过 Spread 语法统一到参数数组内, 即 fn.call(context, ...args)
      // apply / call 立即执行, 因此此处返回的是 func()
      return curry.call(this, fn, arr)
      // return curry.apply(this, [fn, arr])
    } else {
      return fn.apply(this, arr)
    }
  }
}


// 高颜值写法
function curry1(fn, arr = []) {
  return (...args) => {
    arr = arr.concat(args);
    return (arr.length < fn.length) ?
      curry.call(this, fn, arr) :
      fn.call(this, ...arr)
  }
}


// test
function add(a, b, c, d = 4) {
  return a + b + c + d
}

console.log('原始函数: ' + add(1, 2, 3, 4));

const curryFunc = curry(add);
console.log('函数柯里化: ' + curryFunc(1)(2)(3));
