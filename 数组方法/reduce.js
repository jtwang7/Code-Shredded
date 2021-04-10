// 循环遍历实现 reduce
// 由于可能存在稀疏数组, 例如 [,,, 3]; 因此需要调过稀疏值; reduce 内大部分判断都是为了处理稀疏值
// 稀疏值没有键, 通过 arr.hasOwnProperty() 判断;
Array.prototype.myReduce = function (fn, initValue) {
  let res = undefined; // 初始值
  let startIdx = undefined; // 初始值索引
  const arr = this; // 目标数组

  if (initValue !== undefined) {
    // 指定初始值
    res = initValue;
  } else {
    // 未指定, 则取数组中第一个有效值
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      res = arr[i];
      startIdx = i;
      break;
    }
  }

  // 若指定初始值, 则从0开始遍历; 反之从下一个数组值遍历(第一个作为初始值)
  for (let i = ++startIdx || 0; i < arr.length; i++) {
    // 寻找有效值
    if (!arr.hasOwnProperty(i)) continue
    res = fn.call(null, res, arr[i], i, arr);
  }

  return res;
}


// 原生 reduce
const arr = [1, 2, 3, 4, 5]
const res1 = arr.reduce((pre, item, idx, array) => {
  return (pre + item)
}, 0)

// 自己实现
const res2 = arr.myReduce((pre, item, idx, array) => {
  return (pre + item)
}, 0)

console.log(res1, res2);