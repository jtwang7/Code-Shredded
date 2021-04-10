class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    this.resolve = value => {
      if (this.state === 'pending') {
        this.value = value;
        this.state = 'fulfilled';
        this.onFulfilledCallbacks.forEach(fn => fn(this.value));
      }
    }
    this.reject = error => {
      if (this.state === 'pending') {
        this.error = error;
        this.state = 'rejected';
        this.onRejectedCallbacks.forEach(fn => fn(this.error));
      }
    }
    executor(this.resolve, this.reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    let {
      state, value, error,
      onFulfilledCallbacks, onRejectedCallbacks
    } = this;
    // 创建链式调用：实例化一个新的 promise
    let promise2 = new MyPromise((resolve, reject) => {
      // 下一个 promise 的 then 方法接收本次 then 的返回值作为参数;
      // 本次返回值类型未知, 需进一步判断;
      if (state === 'fulfilled') {
        // then() 回调执行时用 setTimeout 包裹
        // 原生 Promise 实现的 then 属于微任务, 此处用 setTimeout 宏任务做替代, 使同步代码先于 then 回调执行
        setTimeout(() => {
          try {
            // 存储本次 then 的返回值
            let x = onFulfilled(value);
            // 自定义 x 类型判断函数
            // 注意: 此处 promise2 是可以取到的, 先 new 的实例, 后执行的 executor()
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(error);
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (state === 'pending') {
        onFulfilledCallbacks.push((val) => {
          setTimeout(
            () => {
              try {
                let x = onFulfilled(val);
                this._resolvePromise(promise2, x, resolve, reject);
              } catch (e) {
                reject(e)
              }
            }
            , 0)
        }
        );
        onRejectedCallbacks.push((err) => {
          setTimeout(
            () => {
              try {
                let x = onRejected(err);
                this._resolvePromise(promise2, x, resolve, reject);
              } catch (e) {
                reject(e)
              }
            }
            , 0)
        }
        );
      }
    })
    // 抛出实例
    return promise2;
  }

  _resolvePromise(promise2, x, resolve, reject) {
    // 若 then 返回其实例对象(promise2), 发生循环引用, 报错;
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
      return;
    }

    let called = false;

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // 若没有 then 方法则抛出异常, 用 catch 捕获
        let then = x.then;
        // 若存在 then 且是方法, 则 x 是 promise;
        if (typeof then === 'function') {
          // 立即执行 then(), 传递成功回调和拒绝回调
          then.call(x, val => {
            // 检查是否执行过 resolve / reject; 若执行过, 则其后续写的 resolve(), reject() 都不再执行;
            if (called) return;
            called = true;
            // 递归检查是否还嵌套 promise
            this._resolvePromise(x, val, resolve, reject)
          }, err => {
            if (called) return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        // then() 无法正常运行则返回 error;
        reject(err);
      }
    } else {
      // null 或 原始类型, 直接返回值;
      resolve(x);
    }
  }
}

// 实现一个promise的延迟对象 defer, 用于 Promise A+ 规范测试
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = MyPromise;



// test
const prm3 = new MyPromise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve(2);
  }, 1000)
})

prm3.then(res => {
  console.log(res);
  return 3
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4)
    }, 1000)
  })
}).then(res => {
  console.log(res);
})

console.log(5);