Function.prototype.myApply = function (ctx, args) {
  ctx = ctx || window;
  ctx.fn = this;
  args = [...args]; // apply 接收数组或类数组类型, 此处统一转为数组;
  let res = !args.length ? ctx.fn() : ctx.fn(...args); // 判断是否存在参数, 并执行函数;
  Reflect.deleteProperty(ctx, 'fn'); // 注意 PropertyKey 是字符串类型;
  return res;
}



// test
let obj = {
  a: 10,
  b: 20
}
function test(key1, key2) {
  console.log(this[key1] + this[key2])
}
test.myApply(obj, ['a', 'b']) // 30  注意这里是传入数组 ['a', 'b']