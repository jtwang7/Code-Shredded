function bubbleSort(arr) {
  const lens = arr.length;
  // 控制整体循环;
  for (let i = 0; i < lens; i++) {
    // 控制一次冒泡循环;
    // 最上层已冒泡部分不做修改;
    for (let j = 0; j < lens - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr;
}

import {generateArray} from '../generateArray.js';
console.log(bubbleSort(generateArray(10)));