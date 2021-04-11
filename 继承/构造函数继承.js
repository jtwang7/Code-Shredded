let Parent = function(age) {
  this.name = 'Siri';
  this.hobby = [];
  this.age = age;
  this.sayHi = function() {
    console.log('Hi ' + this.name);
  }
}
let Child = function() {
  // call 执行父类构造函数, 将父类所有属性方法挂载到子类 this 上;
  Parent.call(this, 18);
  this.action = 'eat';
}

// 1. 避免了引用类型的属性被所有实例共享;
// 2. 可以在child中向parent传参;
// 3. 子类每次实例化都创建一个 this, 挂载所有父类属性和方法, 导致一些共享方法重复创建;




// *********************************************************
// 1. 验证:
const child1 = new Child();
const child2 = new Child();
const parent1 = new Parent();
child1.hobby.push('football');
console.log(child1.hobby);
console.log(child2.hobby);
// 结果:
// [ 'football' ]
// []
// 结果分析:
// 构造函数继承本质上是通过 call 函数改变父构造函数 this 指向, 使其在子类 this 上执行, 将父类属性和方法挂载到子类 this 上;
// 每个子类持有不同的 this 指向, 因此子类间互不干涉;
console.log('*************************************************');


// 2. 验证:
const child3 = new Child(18);
console.log(child3.age);
// 结果:
// 18