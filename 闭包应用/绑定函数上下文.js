// Function.prototype.bind() 实现
// bind 实现了什么: 创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一系列参数将会在传递的实参前传入作为它的参数。
// bind 接收的参数:
// 1. thisArg
// 2. param1, param2, ... ;
// bind 返回值:
// 返回一个函数
Function.prototype.myBind = function () {
  const fn = this, 
        args = [...arguments], // 包含传给 bind 的第一参数和第二参数
        obj = args.shift(); // 获取第一参数
  // 返回一个绑定了 this 的新函数; this 绑定通过 Function.apply 实现
  return function () {
    return fn.apply(obj, args.concat([...arguments])) // 此处 arguments 是新函数接收的参数, 将其拼接到 bind 传递的参数后面
  }
}


// 上述 bind 实现没有考虑函数通过 new 调用创建实例的场景
// 若通过 new 操作符, bind 绑定的 this 应该失效, this 应该指向实例的 this (new绑定 > bind绑定(硬绑定))
// 注: new 绑定的 this 指向构造函数创建的实例对象(不是指向构造函数, new 基于构造函数原型创建了空对象并在上面挂载了构造函数的属性, 形成了实例对象)
// 此处应该判断函数是否被 new 调用, 若是, 则用 new 的方法实现一遍
Function.prototype.myBind = function () {
  const fn = this, 
        args = [...arguments],
        obj = args.shift();

  const res =  function () {
    // const func = Func.bind(...)
    // 注意此处调用结构, 只有当 func 被执行时(func()), this 才真正被绑定(fn.apply(...))
    // 当 const func = new Func 时, func this 指向 Func.prototype, 因此在执行 fn.apply() 时, 判断当前 this 是否指向 Func.prototype 即可.
    
    // 注意此处 this 指向, 若res没有被 new 调用, 那么相当于执行默认绑定, this 指向全局, this instanceof tmp 不成立, 因此执行 apply 绑定 obj
    // 若 res 被 new 调用, 此时执行 new 绑定, this 指向 res.prototype, 也就是 tmp 的实例, this instanceof tmp 成立, 绑定 this.
    console.log(this);
    return fn.apply(this instanceof tmp ? this: obj, args.concat([...arguments]))
  }

  // MDN 的 polyfill 实现 new
  function tmp() {};
  tmp.prototype = this.prototype; // 此时 tmp 就是该函数的一个副本
  res.prototype = new tmp(); // 创建实例并将返回函数的 this 指向实例, 即完成了 new 的 this 指向.

  return res;
}