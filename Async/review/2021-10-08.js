/**
 * spawn 函数接收 Generator 函数，自动执行并最终返回一个 Promise 对象
 * @param {Function} genFn 
 * @returns Promise
 */
function spawn(genFn) {
  // spawn 返回一个 Promise 对象
  return new Promise((resolve, reject) => {
    let gen = genFn(); // 调用 Generator 函数生成遍历器对象
    // 封装递归操作
    const step = function (nextFn) {
      let obj;
      try {
        obj = nextFn();
      } catch (err) {
        return reject(err);
      }
      // 递归结束条件
      if (obj.done) {
        return resolve(obj.value);
      }
      // obj.value 可以是 Promise, thenable, 以及基础类型
      // Promise.resolve() 的主要目的是包裹基础类型的数据，让其可以调用 then 方法注册回调
      Promise.resolve(obj.value).then(v => {
        step(function () { return gen.next(v) })
      }, err => {
        step(function () { return gen.throw(err) })
      })
    };
    step(function () { return gen.next() }) // 启动 generator 函数
  })
}

// 模拟 async 函数：spawn 自执行器 + generator 函数
function fn(...args) {
  return spawn(
    function* () {
      let i = yield sleep()
      console.log('i:' + i);
      let j = yield sleep();
      console.log('j:' + j);
    }
  )
}

// 模拟异步操作
function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000)
  })
}

// test
fn();