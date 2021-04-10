// 简易版深拷贝
function deepClone(target) {
  // 递归终止条件
  if (typeof target === 'object') {
    // 这部分其实就是浅拷贝
    // 判断是否为数组
    let obj = Array.isArray(target) ? [] : {};
    for (let [key, value] of Object.entries(target)) {
      // 此处需要继续判断 value 是不是 object, 因此递归写在这里, obj[key] 收集递归值
      obj[key] = deepClone(value);
    }
    // 返回递归值
    return obj;
  } else {
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