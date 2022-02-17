/**
 * 定义：一个构造函数仅能有一个实例，并提供一个访问它的全局访问点。
 * 单例模式使用场景：比如线程池、全局缓存等。我们所熟知的浏览器的window对象就是一个单例，在JavaScript开发中，对于这种只需要一个的对象，我们的实现往往使用单例。
 * 实现思路：用一个变量来标志当前的类已经创建过对象，如果下次获取当前类的实例时，直接返回之前创建的对象即可。
 */

// 构造函数
function CreateSingleton(name) {
  this.name = name;
  this.getName();
};
CreateSingleton.prototype.getName = function () {
  console.log(this.name)
};

// 返回：单例对象构造函数
let Singleton = (function () {
  let instance; // 闭包保存单例对象
  return function (name) {
    if (!instance) {
      instance = new CreateSingleton(name); // 从未生成单例对象，调用构造函数生成实例，并利用闭包保存
    }
    return instance; // 若已经生成了单例对象，则直接返回
  }
})();


// test
let a = new Singleton('a'); // 创建实例对象1
let b = new Singleton('b'); // 创建实例对象2
console.log(a === b);

