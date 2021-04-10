class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    // 存储成功状态执行的回调
    this.onFulfilledCallbackfn = [];
    // 存储拒绝状态执行的回调
    this.onRejectedCallbackfn = [];

    this.resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 状态改变时清空回调队列, 触发回调
        this.onFulfilledCallbackfn.forEach(fn => fn(this.value));
      }
    }
    this.reject = error => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = error;
        // 状态改变时清空回调队列, 触发回调
        this.onRejectedCallbackfn.forEach(fn => fn(this.error));
      }
    }
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    }
    if (this.state === 'rejected') {
      onRejected(this.error);
    }
    // 状态还未改变, 将回调存储至对应队列;
    if (this.state === 'pending') {
      this.onFulfilledCallbackfn.push(onFulfilled);
      this.onRejectedCallbackfn.push(onRejected);
    }
  }
}





// test
const prm2 = new MyPromise((resolve, reject) => {
  console.log('1');
  setTimeout(() => {
    resolve(2);
  }, 1000)
})

prm2.then((value) => {
  console.log(value);
})