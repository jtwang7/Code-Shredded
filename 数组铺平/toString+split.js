function isArray(arr) {
  function isArrFunc(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  return Array.isArray ? Array.isArray(arr) : isArrFunc(arr);
}

function flat(arr) {
  if (!isArray(arr)) {
    throw new Error('传入值类型不为数组类型')
  }
  // arr.toString(): 展平成 "1,2,3,..."
  // str.split(","): 获得字符数组: ["1","2","3",...]
  // arr.map(): 将元素转为数字
  return arr.toString().split(",").map(item => {
    return parseInt(item)
  })
}


// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试

console.log(flat(1)); // try ... catch 测试

