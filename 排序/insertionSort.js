// 插入排序
// 时间复杂度: O(n^2)
// 关键: 从第 1 项开始遍历后面的 n-1 项
// 每次遍历过程: 
// 比对当前项和其左项, 若不符合条件(升序情况下, 若左值大于当前值)则交换顺序;
// 继续从右向左匹配(当前项和前前项), 以此类推, 若符合条件则结束本次循环;

// 形象理解: 整理扑克顺序, 当前牌左侧所有大于当前牌的均插到当前牌右侧, 一边排序完后, 能保证当前牌左侧都比当前牌小;
// 算法实现如上, 注意循环比较的始终是当前项;


function insertionSort(arr) {
  console.time('INSERTIONSORT');

  const lens = arr.length;
  // 第 1 项开始匹配
  for (let i=1; i<lens; i++) {
    // 临时存储原位置信息
    let j = i;
    let tmp = arr[i];
    // 若不符合则交换, 符合则停止本次循环(因为再往左部分都完成排序)
    while(j>0 && arr[j-1] > tmp) {
      arr[j] = arr[j-1];
      j--;
    }
    arr[j] = tmp;
  }

  console.timeEnd('INSERTIONSORT');
  return arr;
}




// time test
// INSERTIONSORT: 39.334ms
import {generateArray} from './generateArray.js';
insertionSort(generateArray(10000));

// result test
console.log(insertionSort(generateArray(10)));