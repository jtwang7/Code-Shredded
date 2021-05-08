function flat(arr) {
  let res = arr.reduce((prev, curv) => {
    return prev = Array.isArray(curv) ? [...prev, ...flat(curv)] : [...prev, curv]
  }, [])

  return res;
}

// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(flat(arr)); // 功能测试