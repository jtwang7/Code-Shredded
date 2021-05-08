function flat(arr) {
  let res = [];
  // 递归体: 根据元素是否为数组判断是否进行递归;
  for (let element of arr) {
    if (Array.isArray(element)) {
      res = res.concat(flat(element)) // 递归 + 结果收集
    } else {
      // 递归出口
      res.push(element);
    }
  }
  return res;
}



// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试