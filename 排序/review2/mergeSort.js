// function mergeSort(arr) {
//   let res = main(arr);
//   return res;
// }

// function main(arr) {
//   if (arr.length === 1) return arr;
//   let mid = Math.floor(arr.length / 2);
//   let left = arr.slice(0, mid)
//   let right = arr.slice(mid)
//   return merge(main(left), main(right))
// }

// // 合并
// function merge(left, right) {
//   let li = 0;
//   let ri = 0;
//   let result = [];
//   // 比较左右数组元素, 并将小值压入结果队列
//   for (; li < left.length, ri < right.length;) {
//     // 因为是从下往上收集结果, 因此左右数组必然已完成排序
//     left[li] < right[ri] ? result.push(left[li++]) : result.push(right[ri++]);
//   }
//   return result.concat(left.slice(li)).concat(right.slice(ri))
// }

function mergeSort(arr) {
  let res = main(arr)
  return res

  function main(arr) {
    // 递归终止条件
    if (arr.length === 1) return arr;

    const mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    // 递归分割, 并在合并时收集结果
    return merge(main(left), main(right))
  }

  function merge(left, right) {
    let li = 0, ri = 0;
    let res = [];
    // 通过左右指针判断, 将小值压入队列, 直到一组数组遍历完;
    while(li < left.length && ri < right.length) {
      left[li] < right[ri] ? res.push(left[li++]) : res.push(right[ri++])
    }
    // 压入另一数组的剩余值
    return res.concat(left.slice(li)).concat(right.slice(ri));
  }
}

import { generateArray } from '../generateArray.js';
console.log(mergeSort(generateArray(10)));