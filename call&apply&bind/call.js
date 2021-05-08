Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx || window; // 赋予 ctx 形参默认值为 window;
  ctx.fn = this; // this 为调用当前 myCall 方法的对象(函数): 例如 sayHi.call(...); 此处将 sayHi 挂载在 ctx.fn 下, 运行 fn 时就会指向 ctx;
  let res = ctx.fn(...args); // 立即执行函数, 此时函数 this 指向 ctx;
  Reflect.deleteProperty(ctx, 'fn'); // 执行完毕后, 删除 ctx 上挂载的 fn 属性, 避免污染;
  return res;
}


// test
let sayName = function (age) {
    console.log('current name: ' + this.name, "current age: " + age);
}
let obj1 = {
    name: "obj's name"
}
sayName.myCall(obj1, 22); //this指向 sayName函数实例
// current name: obj's name current age: 22