Array.prototype.mySome = function some(callback, thisArg) {
  let arr = this; // 保存调用 some 方法的数组对象

  // 遍历数组中每个元素
  for (let i = 0; i < arr.length; i++) {
    // 将各元素作用于回调函数中，回调结果返回 boolean 值，若一个返回值为 true，那么 some 函数的返回值就为 true
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true
    }
  }

  // 若未满足条件，返回 false
  return false
}



const arr = [1, 2, 3, 4, 5];
let res1 = arr.some((item, idx, array) => (item > 4));
console.log(res1);

let res2 = arr.mySome((item, idx, array) => (item > 6));
console.log(res2);