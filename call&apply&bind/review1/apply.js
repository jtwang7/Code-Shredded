Function.prototype.myApply = function (ctx, args) {
  ctx = ctx || window;
  ctx.fn = this;
  args = [...args];
  let res = ctx.fn(...args);
  Reflect.deleteProperty(ctx, 'fn');
  return res;
}