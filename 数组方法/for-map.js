// 循环实现map;
// map 功能: 遍历数组, 并对其各项执行回调函数, 最终返回新数组;
Array.prototype.myMap = function (callbackfn, thisArg = this) {
  // 结果数组
  let res = [];
  // 存储当前数组
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    // 跳过稀疏值
    if (!arr.hasOwnProperty(i)) continue;
    res.push(callbackfn.call(thisArg, arr[i], i, arr))
  }
  return res;
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
