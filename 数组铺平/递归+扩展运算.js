function isArray(arr) {
  function isArrFunc(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  return Array.isArray ? Array.isArray(arr) : isArrFunc(arr)
}

function flat(arr) {
  try {
    if (!isArray(arr)) {
      throw new Error('传入值类型不为数组类型')
    }
    let res = [];
    for (let sub of arr) {
      if (isArray(sub)) {
        // 扩展运算符可铺平 1 层嵌套的数组, 结合递归实现 N 维铺平;
        res.push(...flat(sub))
      } else {
        res.push(sub)
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