function bubbleSort(arr) {
  console.time('BUBBLESORT');

  const lens = arr.length;
  for (let i = 0; i < lens; i++) {
    for (let j = 0; j < lens - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  console.timeEnd('BUBBLESORT');
  return arr;
}


// time test
import {generateArray} from '../generateArray.js';
bubbleSort(generateArray(10000));

// result test
console.log(bubbleSort(generateArray(10)));