// 循环引用: 对象内调用自身, 导致递归拷贝时爆栈;
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let obj = Array.isArray(target) ? [] : {};
    for (let [key,value] of Object.entries(target)) {
      if (map.get(value)) {
        return map.get(value);
      } else {
        // Map 记录"拷贝值 - 对象"的映射关系;
        // obj 是引用类型, 因此本次浅拷贝完成后, 所有拷贝值对应的值均相同;
        map.set(value, obj);
        Reflect.set(obj, key, deepClone(value, map));
      }
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