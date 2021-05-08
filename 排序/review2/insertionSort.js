// function insertionSort(arr) {
//   const lens = arr.length;

//   for (let i = 1; i < lens; i++) {
//     for (let j = i; j >= 1; j--) {
//       if (arr[j] < arr[j - 1]) {
//         [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
//       } else {
//         break;
//       }
//     }
//   }

//   return arr;
// }


// 插排思想: 类似扑克排序, 将当前牌和其左边牌比较大小, 将其插入到相应的位置;
// 关键: 用代码模拟两个动作: 1. 寻找插入的位置 2. 插入当前牌
function insertionSort(arr) {
  const lens = arr.length;

  // 控制整体遍历, 从左往右, 保证前 i 个值都是已排序的;
  for (let i = 1; i < lens; i++) {
    // 存储当前牌信息
    let tmp = arr[i];
    // 从当前牌向左遍历寻找位置
    let j = i;
    while(j > 0 && arr[j-1] > tmp) {
      // 凡是比当前牌大的都会向右挤一格
      arr[j] = arr[j-1];
      j--;
    }
    // 插入当前牌
    arr[j] = tmp;
  }

  return arr;
}

import { generateArray } from '../generateArray.js';
console.log(insertionSort(generateArray(10)));