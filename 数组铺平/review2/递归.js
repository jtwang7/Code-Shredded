function flat1(arr) {
  let res = [];
  for (let elem of arr) {
    if (Array.isArray(elem)) {
      // let result = flat(elem);
      // res = res.concat(result); // 回收递归结果;
      res = res.concat(flat1(elem))
    } else {
      res.push(elem);
    }
  }
  return res;
}

function flat2(arr) {
  let res = [];
  for (let elem of arr) {
    if (Array.isArray(elem)) {
      res = [...res, ...flat2(elem)]
    } else {
      res.push(elem);
    }
  }
  return res;
}

function flat3(arr) {
  return arr.reduce((prev, curv) => {
    return prev = Array.isArray(curv) ? [...prev, ...flat3(curv)] : [...prev, curv];
  }, [])
}

function flat4(arr) {
  return arr.toString().split(',').map(item => parseInt(item));
}


// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];
console.log(flat1(arr)); // 功能测试
console.log(flat2(arr)); // 功能测试
console.log(flat3(arr)); // 功能测试
console.log(flat4(arr)); // 功能测试