Array.prototype.myForEach = function (callback, thisArg) {
  let arr = this;

  // 遍历数组元素，并对各元素应用回调，没有返回值
  for (let i=0; i<arr.length; i++) {
    callback.call(thisArg, arr[i], i, arr);
  }
}