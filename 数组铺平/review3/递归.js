function flat(arr) {
  let res = [];
  if (!Array.isArray(arr)) {
    res.push(arr);
    return res;
  }
  for (let item of arr) {
    res.push(...flat(item));
  }
  return res;
}

// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试