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
  let res = arr.reduce((prev, curv)=>{
    return isArray(curv) ? [...prev, ...flat(curv)] : [...prev, curv]
  },[]);
  return res;
}


// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试

console.log(flat(1)); // try ... catch 测试