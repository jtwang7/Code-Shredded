function myInstanceof(prev, after) {
  // 获取实例对象的原型对象
  let pr = Reflect.getPrototypeOf(prev);
  // 获取匹配目标的原型对象
  let af = after.prototype;
  // 迭代匹配原型对象
  while (pr) {
    if (pr === af) {
      return true
    } else {
      // 若实例对象的原型与目标原型不匹配，沿原型链向上查找，取当前实例原型的原型对象，直至原型对象为 null 返回 false
      pr = Reflect.getPrototypeOf(pr);
    }
  }
  return false
}



// test
function Person (){
  this.name = 'Siri';
  this.age = 18;
}
function Child (){
  this.name = 'John';
  this.age = 20;
}

let no = new Person();

console.log(no instanceof Person);
console.log(myInstanceof(no, Person));

console.log(no instanceof Child);
console.log(myInstanceof(no, Child));