Array.prototype.myFill = function (val, start = 0, end = this.length) {
  const arr = this;
  const len = arr.length;
  start = typeof start === 'number' ?
    (start < 0 ?
      (Math.abs(start) > len ? len : len + start)
      : (start > len ? len : start))
    : 0
  end = typeof end === 'number' ?
    (end < 0 ? (Math.abs(end) > len ? len : len + end)
      : (end > len ? len : end))
    : len

  for (let i = start; i < end; i++) {
    arr[i] = val;
  }
  return arr;
}


// test

console.log([1, 2, 3].myFill(4))               // [4, 4, 4]
console.log([1, 2, 3].myFill(4, 1))            // [1, 4, 4]
console.log([1, 2, 3].myFill(4, 1, 2))         // [1, 4, 3]
console.log([1, 2, 3].myFill(4, 1, 1))         // [1, 2, 3]
console.log([1, 2, 3].myFill(4, 3, 3))         // [1, 2, 3]
console.log([1, 2, 3].myFill(4, -3, -2))       // [4, 2, 3]
console.log([1, 2, 3].myFill(4, NaN, NaN))     // [1, 2, 3]
console.log([1, 2, 3].myFill(4, 3, 5))         // [1, 2, 3]
console.log(Array(3).myFill(4))                // [4, 4, 4]
console.log(Array.prototype.myFill.call({ length: 3 }, 4))  // {0: 4, 1: 4, 2: 4, length: 3}
