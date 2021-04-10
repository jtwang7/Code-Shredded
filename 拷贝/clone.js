// 浅拷贝实现
// 浅拷贝实现关键: 1. 返回一个新的对象; 2.循环赋值
function clone(obj) {
  // 1
  let copy = {};
  for (let [key,value] of Object.entries(obj)) {
    // 2
    copy[key] = value;
  }
  return copy;
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

// 浅拷贝
let copy = clone(obj);
// 查看拷贝是否成功
console.log(copy);

copy.hobbies.ball = 'football';
// 查看改动拷贝对象的引用属性值, 源对象是否一同被改变
console.log(obj);