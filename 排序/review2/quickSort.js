function quickSort(arr) {
  const lens = arr.length;
  let li = 0, ri = lens - 1;

  main(arr, li, ri)

  return arr;

  function main(arr, left, right) {
    let index = partition(arr, left, right);
    // 根据上一层分割点递归 (递归终止条件包含在内)
    if (left < index - 1) {
      main(arr, left, index - 1)
    }
    if (right > index) {
      main(arr, index, right)
    }
  }

  function partition(arr, left, right) {
    const midv = arr[Math.floor((left + right) / 2)];
    // 确保中点左侧全部小于中点值, 右侧反之, 若不成立则交换值;
    while (left <= right) {
      while (arr[left] < midv) {
        left++;
      }
      while (arr[right] > midv) {
        right--;
      }

      if (left <= right) {
        [arr[right], arr[left]] = [arr[left], arr[right]];
        left++;
        right--;
      }
    }
    // 返回分割点
    return left;
  }
}

import { generateArray } from '../generateArray.js';
console.log(quickSort(generateArray(10)));