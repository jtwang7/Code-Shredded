Array.prototype.myFilter = function(fn, thisArg = this) {
  const arr = this;
  let res = [];
  for (let i=0; i<arr.length; i++) {
    fn.call(thisArg, arr[i], i, arr) && res.push(arr[i]);
  }
  return res;
}


// test

console.log([1,2,3,4,5].filter(function(current, index, arr) {
  // console.log(current, index, arr)
  return index > this.a
},{a:1}))//[3,4,5]