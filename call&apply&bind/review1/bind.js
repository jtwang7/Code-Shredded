Function.prototype.myBind = function (ctx) {
  const fn = this;
  return function () {
    return fn.call(ctx);
  }
}