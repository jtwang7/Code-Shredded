function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let res = Array.isArray(target) ? [] : {};
    for (let [key, value] of Object.entries(target)) {
      if (map.get(value)) {
        // 发现 Siri 已被拷贝, 直接返回 [object Object];
        // 第一遍循环, map 添加了 value: obj, res: obj; 对 value: obj 开启第二遍循环;
        // 第二遍循环, map 查询到 value: 'Siri' 已被拷贝, 直接返回了 res 并终止递归, 而由于引用的关系, 第一遍的 res 都是 obj, 因此返回了 obj;
        // 递归回收结果时, 将第一遍循环的 copyObj 赋予了 obj, 解决了循环引用的问题;
        console.log(`发现 ${value} 已被拷贝, 直接返回 ${map.get(value)}`);

        // 若拷贝的值已拷贝过, 则直接返回上次的拷贝结果, 不重复递归;
        return map.get(value);
      }
      // 记录每次拷贝的值, 并存储对应的拷贝结果, 由于拷贝结果是引用类型, 因此本次循环中所有 value 对应的都是同一个 res;
      map.set(value, res);
      // 拷贝值为引用类型, 递归拷贝;
      Reflect.set(res, key, deepClone(value, map));
    }
    // 返回拷贝结果;
    return res;
  } else {
    // 若拷贝值不为引用类型, 直接返回原始值;
    return target;
  }
}




// test
// 源对象
const obj = {
  name: 'Siri',
  age: 30,
  hobbies: {
    ball: 'basketball',
    eat: 'ice-cream',
  }
}
// 模拟循环引用
obj.copyObj = obj;

// 深拷贝
let copy = deepClone(obj);
// 查看拷贝是否成功
console.log(copy);

copy.hobbies.ball = 'football';
// 查看改动拷贝对象的引用属性值, 源对象是否一同被改变
console.log(obj);