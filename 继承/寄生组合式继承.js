let Parent = function() {
  this.name = 'Siri';
  this.hobby = [];
  this.age = age;
}
Parent.prototype.sayHi = function() {
  console.log('Hi ' + this.name);
}

let Child = function() {
  // 构造函数继承;
  Parent.call(this, 18);
  this.action = 'eat';
}

// 关键: 用临时空构造函数仅接收父类原型的共享方法, 而不挂载父类的属性;
let F = function() {};
F.prototype = Parent.prototype;
// 原型链继承;
Child.prototype = new F();

// 组合式继承中两次调用了父类构造函数, 导致子类实例对象中包含了父类属性, 其原型对象也挂载了父类属性, 而索引父类属性时在子类实例中找到属性则停止索引, 其原型对象的父类属性占用了空间导致内存浪费;
// 寄生组合关键在于其用临时空构造函数代替了父类构造函数完成了原型链继承, 只改变空构造函数原型指向获取父类原型, 获取其原型上的共享方法, 而不挂载父类构造函数的属性, 从而避免了内存浪费;