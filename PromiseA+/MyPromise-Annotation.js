// 创建 MyPromise 类;
class MyPromise {
  // 实例化时接收 executor 函数;
  constructor(executor) {
    // 管理状态/值/错误信息;
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    // 队列: 存储回调; 
    // 解决 executor 内异步操作导致 then 执行时状态仍为 pending 的情况(保存 then 回调, 在状态改变清空队列); 
    // 解决多个 then 调用;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // resolve() 改变状态/存储值;
    this.resolve = val => {
      // 只有当 pending 状态时执行, 即状态改变不可逆
      if (this.state === 'pending') {
        // 改变状态
        this.state = 'fulfilled';
        // 存储值
        this.value = val;
        // 清空成功回调队列
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    // reject() 改变状态/存储错误信息;
    this.reject = err => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = err;
        // 清空拒绝回调队列
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    // 实例化时自动执行 executor (利用了 constructor 自动执行的特点);
    executor(this.resolve, this.reject);
  }
  // then 方法: 接收两个回调函数;
  then(onFulfilled, onRejected) {
    // 确保传入的是函数类型, 若没有传入或传入不是函数类型则取默认值;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    // 链式调用: 返回新的 MyPromise 实例;
    let promise2 = new MyPromise((resolve, reject) => {
      // fulfilled 状态执行;
      if (this.state === 'fulfilled') {
        // 利用 setTimeout 宏任务模拟原生 Promise then() 微任务, 确保 then 在同步代码清空后执行;
        setTimeout(() => {
          // try...catch... 确保错误抛出被正确捕获;
          try {
            // 接收回调返回值作为下一次 then() 回调函数的参数
            let x = onFulfilled(this.value);
            /**
             * 判断回调返回值, _resolvePromise 做了以下事情：
             * 1. 判断是否存在循环引用
             * 2. 判断回调返回值 x 是否是 Promise：
             *    若是则递归 then()；
             *    若不是则用 resolve() 传递出返回值；[上一步回调只是计算出了返回值，没有 resolve 结果]
             */
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      // rejected 状态执行;
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
      // pending 状态执行;
      if (this.state === 'pending') {
        // 仍处于 pending 意味着异步还未完成, 将回调保存至回调队列;
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 此处 this.value 在清空队列时才被赋值;
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
  // 回调返回值判断;
  _resolvePromise(promise2, x, resolve, reject) {
    // 返回 MyPromise 实例本身会导致循环引用, 报错并终止;
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
      return;
    }
    // Promise A+ 2.3.3.3.3 规定:
    // 如果同时调用resolvePromise和rejectPromise或对同一个参数进行了多次调用，则第一个调用优先，其他任何调用都将被忽略。
    // 通过 called 变量维护上述操作;
    let called = false;
    // 返回值是 object 或 function 类型且不为空时, 进一步判断;
    // 否则意味着返回值是原始类型, 直接传递给 promise2 then 的回调函数;
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // try...catch.. 捕获运行 then 方法可能引发的错误;
      try {
        // 判断 x 是否为 MyPromise 实例: 看它的 then 是否是函数;
        let then = x.then;
        if (typeof then === 'function') {
          // 是函数说明 x 是 MyPromise 实例, 通过 call 立即调用执行(因为下一个 then 要的是值而不是 MyPromise 实例);
          // then.call(thisArg, successFunc, rejectFunc);
          // 此处 thisArg === x，是因为 x.then 重新赋值给了 then，导致引用丢失，所以要用 call 重新绑定调用对为 x
          then.call(x, val => {
            // resolvePromise 被调用, 忽略后续的 resolvePromise 和 rejectPromise 调用
            // resolvePromise 被多次调用的原因是因为 then() 方法内本身就有调用了一次 _resolvePromise()
            if (called) return;
            called = true;
            this._resolvePromise(x, val, resolve, reject);
          }, err => {
            // rejectPromise 被调用, 忽略后续的 resolvePromise 和 rejectPromise 调用
            if (called) return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        // Promise A+ 2.3.3.3.4 规定:
        // 如果调用后抛出异常e, 若已调用resolvePromise或rejectPromise, 则将其忽略(called 维护);
        // 否则, 拒绝并暴露错误信息;
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }
}

MyPromise.resolve = function (val) {
  if (val instanceof MyPromise) return val;
  // 改变状态为 fulfilled;
  return new MyPromise((resolve, reject) => {
    resolve(val);
  })
}

MyPromise.reject = function (err) {
  // 改变状态为 rejected;
  return new MyPromise((resolve, reject) => {
    reject(err);
  })
}

// 等价于执行 then 的第二个回调函数;
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// 接收 promise 对象数组, 当全部 promise 对象 resolve 时执行 onFulfilled 方法;
// 当有一个 promise 对象 reject 时执行 onRejected 方法;
// 成功执行的结果按 promise 对象数组的顺序来排放;
MyPromise.prototype.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    const lens = promises.length;
    let arr = new Array(lens);
    let count = 0;
    // 依据索引顺序存放;
    function processData(data, idx) {
      arr[idx] = data;
      count++;
      // 若所有 promises 均成功执行回调, 返回结果数组;
      // processData() 写在 MyPromise 内就不需要传递 resolve() 了, 会自动向上索引引用;
      if (count === lens) resolve(arr);
    }
    promises.forEach((item, idx) => {
      // 遍历 promises 数组, fulfilled 执行成功回调, 存放数据, rejected 执行拒绝回调, 直接退出遍历;
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
      // 遍历数组, 若某 promise 状态落定, 则改变状态并结束遍历;
      item.then(res => resolve(res), err => reject(err))
    })
  })
}

// 无论 promise 状态如何, 都会执行 fn 回调
MyPromise.prototype.finally = function (fn) {
  return this.then(
    // resolve() 保证 fn() 必被执行
    // 后续跟上 then() 用于传递 value 或 error;
    val => MyPromise.resolve(fn()).then(() => val),
    err => MyPromise.resolve(fn()).then(() => err)
  )
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
const prm1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000)
})
const prm2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000)
})
const prm3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000)
})
const prm4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(4);
  }, 4000)
})
const prm5 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('我是错误'));
  }, 4000)
})
MyPromise.all([
  prm1, prm2, prm3, prm4
]).then(([res1, res2, res3, res4]) => {
  console.log(res1);
  console.log(res2);
  console.log(res3);
  console.log(res4);
}, err => {
  console.log(err);
})
MyPromise.all([
  prm1, prm2, prm3, prm4, prm5
]).then(([res1, res2, res3, res4, res5]) => {
  console.log(res1);
  console.log(res2);
  console.log(res3);
  console.log(res4);
}, err => {
  console.log(err);
})
MyPromise.race([
  prm1, prm2, prm3, prm4, prm5
]).then(val => {
  console.log(val);
}, err => {
  console.log(err);
})