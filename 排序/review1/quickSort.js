function quickSort(arr) {
  console.time('QUICKSORT');

  let left = 0, right = arr.length - 1;
  main(arr, left, right);

  console.timeEnd('QUICKSORT');
  return arr;

  function main(arr, left, right) {
    if (arr.length === 1) return;
    const index = partition(arr, left, right);
    if (left < index - 1) {
      main(arr, left, index - 1);
    }
    if (index < right) {
      main(arr, index, right);
    }
  }

  function partition(arr, left, right) {
    const midPivot = arr[Math.floor((left + right) / 2)];
    while (left <= right) {
      while (arr[left] < midPivot) {
        left++;
      }
      while (arr[right] > midPivot) {
        right--;
      }
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
    return left;
  }
}



// time test
// QUICKSORT: 7.058ms
import { generateArray } from '../generateArray.js';
quickSort(generateArray(10000));

// result test
console.log(quickSort(generateArray(10)));