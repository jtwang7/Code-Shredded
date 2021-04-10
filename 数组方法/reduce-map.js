// reduce 实现 map
// 本质上也是循环遍历数组, 对每项应用函数并返回结果集
// 这里用 reduce 代替了 for 循环, 并没有用到 pre 累加器
// ------
// Array.prototype.myMap = function (fn, context = this) {
//   let res = [];
//   this.reduce((pre, item, idx, array) => {
//     res.push(fn.call(context, item, idx, array))
//   },0)
//   return res;
// }


// 用 reduce 累加器实现
// ------
Array.prototype.myMap = function (callbackfn, thisArg = this) {
  return this.reduce((pre, item, idx, array) => {
    // reduce 会将每次的返回结果存储在下一个 pre 中
    return [...pre, callbackfn.call(thisArg, item, idx, array)]
  }, [])
}






// 原生 map
const arr = [1, 2, 3, 4, 5]
const res1 = arr.map((item, idx, array) => {
  return item * 2
})

// 自己实现
const res2 = arr.myMap((item, idx, array) => {
  return item * 2
})

console.log(res1, res2);