class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    this.resolve = val => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = val;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    this.reject = err => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = err;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    executor(this.resolve, this.reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.error);
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              this._resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0)
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.error);
              this._resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err)
            }
          }, 0)
        });
      }
    })
    return promise2;
  }

  _resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
      return;
    }

    let called = false;

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if (typeof then === 'function') {
          then.call(x, val => {
            if (called) return;
            called = true;
            this._resolvePromise(x, val, resolve, reject);
          }, err => {
            if (called) return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x)
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }
}

// 返回一个 fulfilled 状态的 Promise
MyPromise.resolve = function (val) {
  // 若是 promise 实例则直接返回;
  if (val instanceof MyPromise) return val;
  return new MyPromise((resolve, reject) => {
    resolve(val);
  })
}
// 返回一个 rejected 状态的 Promise
MyPromise.reject = function (err) {
  return new MyPromise((resolve, reject) => {
    reject(err);
  })
}
// 等价于执行 onRejected
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// 接收 promise 对象数组, 当全部 promise 对象 resolve 时执行 onFulfilled 方法;
// 当有一个 promise 对象 reject 时执行 onRejected 方法;
// 成功执行的结果按 promise 对象数组的顺序来排放;
MyPromise.prototype.all = function (promises) {
  const lens = promises.length;
  let arr = new Array(lens);
  let count = 0;
  // 根据 promises 对象数组顺序存储结果
  function processData(data, idx) {
    arr[idx] = data;
    count++;
    // 结果全部存储完毕再执行 resolve
    if (count === lens) resolve(arr);
  }
  return new MyPromise((resolve, reject) => {
    // 遍历数组, 成功回调则存储值, 失败一次就直接执行 reject 返回错误信息;
    promises.forEach((item, idx) => {
      item.then(res => {
        processData(res, idx);
      }, err => reject(err))
    })
  })
}

// 接收 promise 对象数组, 返回最先完成的 promise 对象, 不关心它的状态(fulfilled, rejected);
MyPromise.prototype.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(item => {
      // 若完成, 执行 then 内的回调;
      // resolve(), reject() 改变状态, 不可逆, 因此再这之后完成的 promise 都不会执行操作;
      item.then(res => resolve(res), err => reject(err))
    })
  })
}

// 将 Promise 内部的错误冒泡到全局
// done() 同 then() 使用方法一样，可接受两个回调，但不管怎么样，don() 始终会在最后捕获错误并向全局抛出。
MyPromise.prototype.done = function (onFulfilled, onRejected) {
  // done 方法总是处于回调链的尾端，因此不需要再返回 promise(无返回值)
  this.then(onFulfilled, onRejected).catch(
    err => {
      // setTimeout 将抛出错误回调推到下一事件循环，在全局运行(此时当前 Promise 已完全结束)。
      setTimeout(() => {throw err}, 0)
    }
  )
}

// 无论 promise 状态如何, 都会执行 fn 回调
MyPromise.prototype.finally = function (fn) {
  return this.then(
    // resolve() 保证 fn() 必被执行
    // 后续跟上 then() 用于传递 value 或 error;
    val => MyPromise.resolve(fn()).then(() => val),
    err => MyPromise.resolve(fn()).then(() => {throw err})
  )
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