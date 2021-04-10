function cat(fn) {
  const action = 'Eat';
  fn(action)(); // 回调函数执行后, 由于闭包的存在, 返回的函数仍然可以使用回调函数的内部变量
}

function fish(action) {
  const info = 'big fish'
  return function () {
    console.log(`${action} ${info}`);
  }
}

cat(fish);