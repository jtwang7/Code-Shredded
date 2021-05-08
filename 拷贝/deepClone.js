// 完整深拷贝
// 简易版深拷贝没有考虑对象内调用自身的情况, 会出现"循环引用", 结果就是死循环导致栈内存溢出

// "循环引用" 解决方案: 
// 额外开辟一个存储空间，存储当前对象和拷贝对象的对应关系, Map 是比较好的选择; 
// 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝;
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let obj = Array.isArray(target) ? [] : {};
    for (let [key, value] of Object.entries(target)) {
      // value 是被拷贝的对象, 检查它是否存在(被拷贝过), 若存在则直接返回该值, 不需要拷贝;
      if (map.get(value)) {
        return map.get(value);
      }
      // 若不存在, 则将其添加至索引表, 并对其深拷贝; 
      // 此处 obj 刚传入时是空对象, 但由于是引用, 所以后续改变 obj 也会更新表内的值;
      map.set(value, obj);
      // 注意传入 map
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