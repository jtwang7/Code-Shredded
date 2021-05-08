Array.prototype.myReduce = function (fn, initValue) {
  const arr = this;
  let res = undefined;
  let startIdx = undefined;

  if (initValue) {
    res = initValue
  } else {
    for (let i = 0; i < arr.length; i++) {
      // hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
      if (arr.hasOwnProperty(i)) {
        res = arr[i];
        startIdx = i;
        break
      }
    }
  }

  for (let j = ++startIdx || 0; j < arr.length; j++) {
    if (arr.hasOwnProperty(j)) {
      res = fn(res, arr[j], j, arr);
    }
  }

  return res;
}


// 原生 reduce
const arr = [1, 2, 3, 4, 5]
const res1 = arr.reduce((pre, item, idx, array) => {
  return (pre + item)
}, 0)

// 自己实现
const res2 = arr.myReduce((pre, item, idx, array) => {
  return (pre + item)
}, 0)

console.log(res1, res2);