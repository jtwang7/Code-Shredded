// function selectionSort(arr) {
//   const lens = arr.length;

//   for (let i = 0; i < lens; i++) {
//     // 假设当前位置为最小值并记录索引
//     let min = i;
//     for (let j = i; j < lens; j++) {
//       if (arr[min] > arr[j + 1]) {
//         // 遍历更新索引
//         min = j + 1
//       }
//     }
//     if (min !== i) {
//       // 交换, 将最小值下沉至底部
//       [arr[i], arr[min]] = [arr[min], arr[i]]
//     }
//   }

//   return arr;
// }

function selectionSort(arr) {
  const lens = arr.length;

  // 外层控制整体循环
  for (let i = 0; i < lens; i++) {
    let min = i;
    // 内层控制本次寻找最小值的遍历过程
    for (let j = i; j < lens; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min != i) {
      // 将最小值沉底
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }

  return arr;
}

import { generateArray } from '../generateArray.js';
console.log(selectionSort(generateArray(10)));