// 完整深拷贝 -- WeakMap 实现

// 用 WeakMap 代替 Map, 减少内存占用, WeakMap 能自动释放未被引用的变量所占用的内存.
function deepClone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let obj = Array.isArray(target) ? [] : {};
    for (let [key, value] of Object.entries(target)) {
      if (map.get(value)) {
        return value;
      }
      map.set(value, obj);
      obj[key] = deepClone(value, map);
    }
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
// 模拟循环引用
obj.obj = obj;

// 深拷贝
let copy = deepClone(obj);
// 查看拷贝是否成功
console.log(copy);

copy.hobbies.ball = 'football';
// 查看改动拷贝对象的引用属性值, 源对象是否一同被改变
console.log(obj);