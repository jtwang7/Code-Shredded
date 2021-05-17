function curry (fn, arr=[]) {
  let fnParams = fn.length
  return function (...args) {
    arr = arr.concat(args);
    if (arr.length < fnParams) {
      return curry.call(this, fn, arr);
    } else {
      return fn.call(this, ...arr)
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
