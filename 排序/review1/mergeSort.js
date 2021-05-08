function mergeSort(arr) {
  console.time('MERGESORT')
  let res = main(arr);
  console.timeEnd('MERGESORT')
  return res

  function main(arr) {
    if (arr.length === 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    // 回收递归结果
    const mergeResult = merge(main(left), main(right));
    return mergeResult;
  }

  function merge(left, right) {
    let il = 0, ir = 0;
    let result = [];
    while (il < left.length && ir < right.length) {
      left[il] < right[ir] ? result.push(left[il++]) : result.push(right[ir++]);
    }
    return result.concat(left.slice(il)).concat(right.slice(ir));
  }
}



// time test
import { generateArray } from '../generateArray.js';
mergeSort(generateArray(10000));

// result test
console.log(mergeSort(generateArray(10)));