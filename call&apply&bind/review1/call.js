Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || window;
  ctx.fn = this;
  let res = ctx.fn(...args);
  Reflect.deleteProperty(ctx, 'fn');
  return res;
}