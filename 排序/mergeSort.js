// 归并算法
// 时间复杂度: O(nlogn)
// 核心思想 -- 分治: 通过递归地将问题分解成相同或者类型相关的两个或者多个子问题，直到问题简单到足以解决，然后将子问题的解决方案结合起来，解决原始方案;
// 归并排序通过将复杂的数组分解成足够小的数组（只包含一个元素），然后通过合并两个有序数组（单元素数组可认为是有序数组）来达到综合子问题解决方案的目的。

function mergeSort(arr) {
  console.time('MERGESORT');

  let res = main(arr);

  console.timeEnd('MERGESORT');
  return res;

  // 主函数
  function main(arr) {
    // 递归终止条件
    if (arr.length === 1) return arr;
    // 数组拆分
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    // 合并操作 -- 同时也是递归体
    // mergeResult 变量用于收集递归的返回值
    let mergeResult = merge(main(left), main(right));
    return mergeResult
  }
  // 合并函数
  function merge(left, right) {
    // 为左右数组分别设置指针
    let il = 0;
    let rl = 0;
    // 存储合并结果
    let result = []
    // 循环遍历直到某个指针超出索引
    while (il < left.length && rl < right.length) {
      // 将符合条件的结果添加至 result, 同时记得移动指针
      left[il] < right[rl] ? result.push(left[il++]) : result.push(right[rl++]);
    }
    // 将剩余的数组元素添加至末尾
    return result.concat(left.slice(il)).concat(right.slice(rl));
  }
}




// time test
// MERGESORT: 11.557ms
import {generateArray} from './generateArray.js';
mergeSort(generateArray(10000));

// result test
console.log(mergeSort(generateArray(10)));