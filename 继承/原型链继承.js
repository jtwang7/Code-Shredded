let Parent = function() {
  this.name = 'Siri';
  this.hobby = [];
  this.sayHi = function() {
    console.log('Hi ' + this.name);
  }
}
let Child = function() {
  this.action = 'eat';
}

// 子类原型连接父实例;
// 不能通过父子原型直接连接;
Child.prototype = new Parent();

// 1. 所有实例共享父类属性和方法(共享同一内存空间);
// 2. 若内存空间内的值被修改, 所有继承的子类实例值都会发生改变;
// 3. 子类不能向父类传参;





// *********************************************************
// 1. 验证:
const child1 = new Child();
const child2 = new Child();
const parent1 = new Parent();
console.log(child1.name);
child1.sayHi();
console.log(child2.name);
child1.sayHi();
// 结果:
// Siri
// Hi Siri
// Siri
// Hi Siri
console.log('*************************************************');


// 2. 验证：
const child3 = new Child();
const child4 = new Child();
const parent2 = new Parent();
// A 操作
child3.hobby.push('basketball');
console.log(child3.hobby);
console.log(child4.hobby);
console.log(parent2.hobby);
// B 操作
child3.name = 'John';
console.log(child3.name);
console.log(child4.name);
console.log(parent2.name);
// 结果:
// [ 'basketball' ]
// [ 'basketball' ]
// []
// John
// Siri
// Siri
// A 操作 结果分析：
// 子类原型连接的是同一父类实例, 依据 new 操作符内部实现原理, 可知父类实例上挂载了父类构造函数的属性和方法, 子类实例依据原型链查找属性或方法时, 最终会查找到父类实例所挂载的属性和方法, 所有子类实例的操作都会影响该父类实例, 即共享了该父类实例的内存, 因此修改 hobby 会影响到其他子类实例;
// parent2 实例是基于 Parent 构造函数新创建的实例, 与原型链继承时子类原型连接的父类实例不在同一内存空间, 因此 parent2 的 hobby 属性不受影响;
// B 操作 结果分析:
// child3.name = 'John' 实际上是给 child3 实例添加了 name 属性, 并不在其原型链的父类实例上做修改, 因此不影响其他实例;
console.log('*************************************************');