class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.error = undefined;
    this.state = 'pending';

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = val => {
      if (this.state === 'pending') {
        this.value = val;
        this.state = 'fulfilled';
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };
    let reject = err => {
      if (this.state === 'pending') {
        this.error = err;
        this.state = 'rejected';
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    executor(resolve, reject);
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
          } catch (e) {
            reject(e);
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.error);
            this._resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      }
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              this._resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.error)
              this._resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
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

    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
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
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}


// npm i -g promises-aplus-tests
// promises-aplus-tests MyPromise1.js 
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = MyPromise;


MyPromise.resolve = function (val) {
  return new MyPromise((resolve, reject) => {
    resolve(val)
  })
}
MyPromise.reject = function (err) {
  return new MyPromise((resolve, reject) => {
    reject(err)
  })
}
MyPromise.catch = function (fn) {
  return this.then(null, fn)
}
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let res = [];
    let count = 0;
    function store(data, idx) {
      res[idx] = data;
      count++;
      count === promises.length && resolve(res)
    }
    promises.forEach((item, idx) => {
      item.then(
        val => store(val, idx),
        err => reject(err)
      )
    })
  })
}
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(item => {
      item.then(
        val => resolve(val),
        err => reject(err),
      )
    })
  })
}
MyPromise.finally = function (fn) {
  return this.then(
    val => MyPromise.resolve(fn()).then(() => val),
    err => MyPromise.resolve(fn()).then(() => err)
  )
}