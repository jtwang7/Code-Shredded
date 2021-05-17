Object.myCreate = function (obj, ...args) {
  let Fn = function () { };
  Fn.prototype = obj;
  if (args.length > 0) {
    Object.defineProperties(Fn, args);
  }
  return new Fn();
}