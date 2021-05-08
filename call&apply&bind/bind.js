Function.prototype.bind = function (ctx) {
  let _fn = this; // 获取函数;
  return function () {
    return _fn.call(ctx); // 返回绑定的函数;
  }
}



// test
let obj = {
    name: 'seven'
}
 
let func = function () {
    console.log(this.name)
}.bind(obj);

func();