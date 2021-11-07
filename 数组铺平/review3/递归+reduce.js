function flat(arr) {
  let res = [];
  if (!Array.isArray(arr)) {
    res.push(arr);
    return res;
  }
  
  return arr.reduce((prev, cur) => {
    return [...prev, ...flat(cur)];
  }, [])
}

// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试