function flat(arr) {
  let res = [];
  for (let element of arr) {
    if (Array.isArray(element)) {
      res = [...res, ...flat(element)]
    } else {
      res.push(element);
    }
  }
  return res;
}



// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试