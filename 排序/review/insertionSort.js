function insertionSort(arr) {
  console.time('INSERTIONSORT');

  const lens = arr.length;
  for (let i = 1; i < lens; i++) {
    let j = i;
    let tmp = arr[i];
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j-1];
      j--;
    }
    arr[j] = tmp;
  }

  console.timeEnd('INSERTIONSORT');
  return arr;
}


// time test
import { generateArray } from '../generateArray.js';
insertionSort(generateArray(10000));

// result test
console.log(insertionSort(generateArray(10)));
