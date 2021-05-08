Array.prototype.myFindeIndex = function (fn, thisArg = this) {
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (fn.call(thisArg, arr[i], i, arr)) {
      return i;
    }
  }
  return undefined;
}



// test
console.log([4, 6, 8, 12].myFindeIndex(function(item) {
  return item + this.a > 10
},{a:5})); // 1

console.log([4, 6, 8, 12].myFindeIndex(function(item) {
  return item + this.a > 20
},{a:5})); // undefined