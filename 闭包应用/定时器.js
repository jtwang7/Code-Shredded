// 经典问题:
// for 循环完成后, setTimeout 的回调才执行, 由于 i 通过 var 声明, 变量提升到全局, 因此最终返回结果全为 10
for (var i = 0; i < 10; i++) {
  setTimeout(
    () => {
      console.log(i);
    }, 500
  )
}

// 解决方法一: let
// 每个 i 都只存在于自己的块级作用域中
for (let j = 0; j < 10; j++) {
  setTimeout(
    () => {
      console.log(j);
    }, 500
  )
}

// 解决方法二: 闭包
// 缺点: 闭包保留, 无法自动清除, 占用大量内存空间
for (var k = 0; k < 10; k++) {
  (function (i) {
    setTimeout(
      () => {
        console.log(i);
      }, 500
    )
  })(k)
}