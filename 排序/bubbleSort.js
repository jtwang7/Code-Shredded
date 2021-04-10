// 冒泡排序(升序)
// 时间复杂度 O(n^2)
// 关键: 每项与后一项比较, 若不符合要求, 则交换位置, 目标项最终出现在数组末尾;

function bubbleSort(arr) {
  // 启动一个计时器跟踪操作的占用时长;
  console.time('BUBBLESORT');

  const lens = arr.length;
  for (let i = 0; i < lens; i++) {
    // 遍历前 lens-i 项, 后 i 项均以排序完成;
    for (let j = 0; j < lens - i; j++) {
      // 每项与后一项比较
      if (arr[j] > arr[j + 1]) {
        // ES6 交换位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  // 输出操作时长
  console.timeEnd('BUBBLESORT');
  return arr;
}



// time test
// BUBBLESORT: 359.195ms
// 配置 package.json type: module, 以 ES6 加载模块;
import {generateArray} from './generateArray.js';
bubbleSort(generateArray(10000));

// result test
console.log(bubbleSort(generateArray(10)));