// 参考文章：https://segmentfault.com/a/1190000016418021
const testArr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

// 1. Set
// 无法去除 {}，因为每一个 {} 在内存中分配不同的存储地址。
function unique1(arr) {
  return Array.from(new Set(arr));
}
// TEST
// console.log(unique1(testArr));

// 2. Set(简化版)
function unique2(arr) {
  return [...new Set(arr)];
}
// TEST
// console.log(unique2(testArr));

// 3. 双重循环: for + splice
// NAN 和 {} 无法去重，null 会被全部清除。
function unique3(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // i 固定当前元素，j 查找后续是否存在重复元素，若存在则删除。
      // 由于数组长度改变，需要手动回退 j。
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
// TEST
// console.log(unique3(testArr));

// 4. 辅助数组 + indexOf
// NAN 和 {} 无法去重
function unique4(arr) {
  let sup = [];
  for (let i = 0; i < arr.length; i++) {
    if (sup.indexOf(arr[i]) === -1) {
      sup.push(arr[i])
    }
  }
  return sup;
}
// TEST
// console.log(unique4(testArr));


// 5. filter + indexOf
// 可以用 “arr.filter()” 方法代替 for 循环。
// {} 无法去重
function unique5(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item, 0) === index
  })
}
// TEST
// console.log(unique5(testArr));

// 6. reduce + includes
// {} 无法去重
function unique6(arr) {
  return arr.reduce((pre, cur) => {
    console.log(pre);
    return pre.includes(cur) ? pre : [...pre, cur]
  }, [])
}
// TEST
// console.log(unique6(testArr));


// 7. 辅助数组 + includes
// {} 没有去重
function unique7(arr) {
  let sup = [];
  for (let i = 0; i < arr.length; i++) {
    if (!sup.includes(arr[i])) {
      sup.push(arr[i])
    }
  }
  return sup;
}
// TEST
// console.log(unique7(testArr));



// 8. obj.hasOwnProperty()
// 全部去重
function unique8(arr) {
  let obj = {}
  return arr.filter(item => {
    return obj.hasOwnProperty(typeof item + item) ? false : (Reflect.set(obj, typeof item + item, true))
  })
}
// TEST
// console.log(unique8(testArr));


// 9. Map
// 无法去重 {}
function unique9(arr) {
  let map = new Map();
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], true);
    } else {
      map.set(arr[i], false);
      res.push(arr[i])
    }
  }
  return res;
}
// TEST
// console.log(unique9(testArr));