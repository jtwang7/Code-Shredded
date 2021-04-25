// async 实现

function fn(...args) {
  // async => generator + generator 自动执行器(spawn) => 封装;
  return spawn(function* gen() {
    let a = yield sleep();
    console.log(a);
    let b = yield sleep();
    console.log(b);
  })
}

/**
 * spawn: generator 自动执行器
 * @param {Function} gen generator 函数
 * @returns Promise
 */
function spawn(gen) {
  // async 返回一个 Promise;
  return new Promise((resolve, reject) => {
    const g = gen(); // 获取迭代器对象;
    // step 作用: 注册一个回调, 在回调内交还 generator 函数的执行权;
    function step(callback) {
      let res; // 迭代器对象
      try {
        res = callback();
      } catch (err) {
        reject(err);
      }
      // 递归出口: 当迭代完毕(done === true)时, 停止迭代并返回最后的值;
      if (res.done) return resolve(res.value);
      // 用 Promise.resolve() 包裹 res.value 原因: 
      // async 规定 await 后面可以是任意 thenable 对象或原始类型值; 
      // 此处 Promise.resolve() 主要是将那些原始类型值做一层包装, 使它们可以使用 then 方法;
      Promise.resolve(res.value).then(function (val) {
        // g.next(val) 传参的理解: 
        // generator yield 运行的结果只能通过 g.next() 返回值 res 获取(generator 外部获取), 即 generator 内部是获取不到的, g.next(params) 则提供了一种向 generator 内传值的方式;
        // g.next(params) 流程: 从上一次 yield 停止处恢复 generator 执行权, 将 next 参数赋给上一次的 yield 返回值(默认 undefined), 执行 generator 直至下一个 yield(包括 yield 表达式的执行);
        step(function () { return g.next(val) })
      }).catch(function (err) {
        step(function () { return g.throw(err) })
      })
    }
    step(function () { return g.next(undefined) })
  })
}


function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

fn();