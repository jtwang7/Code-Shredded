function flat(arr) {
  let res = arr.reduce((prev, curv)=>{
    if (Array.isArray(curv)) {
      prev = prev.concat(flat(curv))
    } else {
      prev.push(curv)
    }
    return prev
  },[])
  return res;
}


// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试