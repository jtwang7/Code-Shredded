// 判断是否为数组
function isArray(arr) {
  // 兼容 ES5 之前版本
  function isArrFunc(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  // Array.isArray() 于 ES5 实现, 考虑兼容性;
  return Array.isArray ? Array.isArray(arr) : isArrFunc(arr)
}

function flat(arr) {
  // 捕获抛出的错误
  try {
    // 判断首次传入的数据类型是否为数组, 若不是则抛出错误;
    if (!isArray(arr)) {
      throw new Error('传入值类型不为数组类型');
    };
    let res = [];
    for (let sub of arr) {
      if (isArray(sub)) {
        // 若为数组, 则继续递归, 并在回退时收集递归结果;
        res = res.concat(flat(sub));
      } else {
        res.push(sub);
      }
    }
    return res;
  } catch (err) {
    console.log(err);
  }
}


// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试

console.log(flat(1)); // try ... catch 测试