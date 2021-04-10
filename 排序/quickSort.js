// 快速排序
// 时间复杂度: O(nlogn)
// 核心思想 -- 分治: 与归并算法区别在于其重点在于数组的分解，而归并排序的重点在于数组的合并;
// 步骤:
// （1）首先，选取数组的中间项作为参考点pivot。
// （2）创建左右两个指针left和right，left指向数组的第一项，right指向最后一项，然后移动左指针，直到其值不小于pivot，然后移动右指针，直到其值不大于pivot。
// （3）如果left仍然不大于right，交换左右指针的值（指针不交换），然后左指针右移，右指针左移，继续循环直到left大于right才结束，返回left指针的值。
// （4）根据上一轮分解的结果（left的值），切割数组得到left和right两个数组，然后分别再分解。
// （5）重复以上过程，直到数组长度为1才结束分解。

// 快速排序相对于归并排序而言加强了分解部分的逻辑，消除了数组的合并工作，并且不用分配新的内存来存放数组合并结果，所以性能更加优秀


function quickSort(arr) {
  console.time('QUICKSORT');
  
  // 初始化左指针和右指针
  let left = 0, right = arr.length - 1;
  main(arr, left, right);

  console.timeEnd('QUICKSORT');
  return arr;

  function main(arr, left, right) {
    // 递归终止条件: 不需要返回值, 因为直接修改的arr;
    if (arr.length === 1) return;
    let index = partition(arr, left, right);
    // 递归左数组
    if (left < index - 1) {
      main(arr, left, index-1);
    }
    // 递归右数组
    if (index < right) {
      main(arr, index, right);
    }
  }

  function partition(arr, left, right) {
    // 取数组中点作为参考点
    const midPivot = arr[Math.floor((left + right) / 2)];
    while (left <= right) {
      // 寻找参考点左侧大于参考值的值, 用左指针标记
      // 寻找参考点左侧小于参考值的值, 用右指针标记
      while (arr[left] < midPivot) {
        left++
      }
      while (arr[right] > midPivot) {
        right--
      }
      // 若左指针小于右指针, 说明存在不符合条件的值, 在此处交换位置;
      // 不要忘记移动指针, 执行下一次循环, 直到该数组顺序符合要求为止;
      if (left <= right) {
        [arr[right], arr[left]] = [arr[left], arr[right]]
        left++;
        right--;
      }
    }
    // 返回左指针(实际上就是参考点位置 + 1)
    return left;
  }
}






// time test
// QUICKSORT: 7.058ms
import {generateArray} from './generateArray.js';
quickSort(generateArray(10000));

// result test
console.log(quickSort(generateArray(10)));