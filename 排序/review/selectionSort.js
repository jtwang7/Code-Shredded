function selectionSort(arr) {
  console.time('SELECTIONSORT');

  const lens = arr.length;
  for (let i = 0; i < lens; i++) {
    let min = i;
    for (let j = i; j < lens; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }

  console.timeEnd('SELECTIONSORT');
  return arr;
}


// time test
import { generateArray } from '../generateArray.js';
selectionSort(generateArray(10000));

// result test
console.log(selectionSort(generateArray(10)));