function deepClone(target) {
  // 循环体: 根据目标是否为引用类型分两种情况拷贝;
  if (typeof target === 'object') {
    // 若为引用类型; 对该目标做浅拷贝, 同时递归判断值是否还存在引用类型;
    let obj = Array.isArray(target) ? [] : {};
    for (let [key, value] of Object.entries(target)) {
      Reflect.set(obj, key, deepClone(value));
    }
    return obj;
  } else {
    // 若为原始类型则直接返回值;
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

// 深拷贝
let copy = deepClone(obj);
// 查看拷贝是否成功
console.log(copy);

copy.hobbies.ball = 'football';
// 查看改动拷贝对象的引用属性值, 源对象是否一同被改变
console.log(obj);