// 选择排序
// 时间复杂度 O(n^2)
// 关键: 找到数组中的最小（大）值，并将其放到第一位，然后找到第二小的值放到第二位……以此类推
// 与冒泡类似, 但其寻找的是最小值, 并存储其索引, 在完成一次遍历后交换, 排序好的值占据数组前排

function selectionSort(arr) {
  console.time('SELECTIONSORT');

  const lens = arr.length;
  for (let i = 0; i < lens; i++) {
    // 记录最小值索引;
    let min = i;
    // 从第 i 项遍历, 前 i 项均以排序;
    for (let j = i; j < lens; j++) {
      // 若遇到更小的值, 更新最小值索引
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      // 最小值交换至第 i 位置
      [arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }

  console.timeEnd('SELECTIONSORT');
  return arr;
}




// time test
// SELECTIONSORT: 79.487ms
import {generateArray} from './generateArray.js';
selectionSort(generateArray(10000));

// result test
console.log(selectionSort(generateArray(10)));