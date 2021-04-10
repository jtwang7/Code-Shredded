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

MyPromise.resolve = function (val) {
  if (val instanceof MyPromise) return val;
  return new MyPromise((resolve, reject) => {
    resolve(val);
  })
}

MyPromise.reject = function (err) {
  return new MyPromise((resolve, reject) => {
    reject(err);
  })
}

MyPromise.catch = function (onRejected) {
  return this.then(null, onRejected)
}

MyPromise.all = function (promises) {
  const lens = promises.length;
  let arr = new Array(lens);
  let count = 0;
  function processData(data, idx) {
    arr[idx] = data;
    count++;
    if (count === lens) resolve(arr);
  }
  return new MyPromise((resolve, reject) => {
    promises.forEach((item, idx) => {
      item.then(res => {
        processData(res, idx);
      }, err => reject(err))
    })
  })
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(item => {
      item.then(res => resolve(res), err => reject(err))
    })
  })
}

MyPromise.finally = function (fn) {
  return this.then(
    val => MyPromise.resolve(fn()).then(() => val),
    err => MyPromise.resolve(fn()).then(() => err)
  )
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = MyPromise;