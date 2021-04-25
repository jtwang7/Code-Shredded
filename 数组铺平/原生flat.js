// Array.prototype.flat(n)
// n: 降维层数
console.log(Array.prototype.flat);

// test
const arr = [1, 2, [3, 4, [5, 6, [7, 8, 9]]], 10, 11];

console.log(arr.flat(1)); // 只降维一层

console.log(arr.flat(Infinity)); // 降维至一层