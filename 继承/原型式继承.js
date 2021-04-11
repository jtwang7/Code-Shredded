function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

// 创建空的构造函数, 连接原型, 返回构造函数的实例; 实例可以通过原型链访问到传入对象;
// ES5 通过 Object.create() 规范化了原型式继承;
// 原型式继承与原型链继承类似, 引用类型的属性值始终会共享相应的值;