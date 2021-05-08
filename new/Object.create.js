Object.myCreate = function (obj, ...args) {
  let F = function() {}
  F.prototype = obj;
  if (!args.length) {
    Object.defineProperties(F, args);
  }
  return new F();
}