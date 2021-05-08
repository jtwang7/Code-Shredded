Array.prototype.myMap1 = function (fn, thisArg = this) {
  const arr = this;
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue;
    res = [...res, fn.call(thisArg, arr[i], i, arr)];
  }

  return res;
}


Array.prototype.myMap2 = function (fn, thisArg = this) {
  const arr = this;
  return arr.reduce((prev, curv, curidx, curarray) => {
    return prev.concat(fn.call(thisArg, curv, curidx, curarray));
  }, [])
}



// 原生 map
const arr = [1, 2, 3, 4, 5]
const res1 = arr.map((item, idx, array) => {
  return item * 2
})

// 自己实现
const res2 = arr.myMap1((item, idx, array) => {
  return item * 2
})

// 自己实现
const res3 = arr.myMap2((item, idx, array) => {
  return item * 2
})

console.log(res1, res2, res3);