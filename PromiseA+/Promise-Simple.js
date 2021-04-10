// 定义 Promise (ES6 类/构造函数)
class MyPromise {
  // constructor 在实例化时立即执行
  constructor(executor) {
    // value 存储值; error 存储错误信息
    this.value = undefined;
    this.error = undefined;
    // 控制 Promise 的状态
    this.state = 'pending';
    // resolve() 接收值, 并改变状态为 fulfilled
    this.resolve = value => {
      // 前提: 状态为 pending; 因为状态改变不可逆;
      if (this.state === 'pending') {
        this.value = value;
        this.state = 'fulfilled';
      }
    };
    // reject() 接收错误信息, 并改变状态为 rejected
    this.reject = error => {
      if (this.state === 'pending') {
        this.error = error;
        this.state = 'rejected';
      }
    }
    // 判断 executor 是否正常执行
    try {
      // executor() 立即执行
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err)
    }
  }

  // Promise 的 then 方法, 接收两个回调函数
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      // fulfilled 状态执行 onFulfilled 回调, 回调接收值作为参数
      onFulfilled(this.value);
    }
    if (this.state === 'rejected') {
      // rejected 状态执行 onRejected 回调, 回调接收错误信息作为参数
      onRejected(this.error);
    }
  }
}




// test
const prm = new MyPromise((resolve, reject) => {
  console.log('1');
  resolve(2);
})

prm.then((value) => {
  console.log(value);
})

// ------
// 上述实现不能处理异步
const prm2 = new MyPromise((resolve, reject) => {
  console.log('1');
  // setTimeout 回调执行在微任务队列清空后
  // 此时 then 的回调已经执行完毕, 再改变状态和存储值没有意义
  setTimeout(() => {
    resolve(2);
  }, 1000)
})

// 先于 ()=>{resolve(2)} 执行
prm2.then((value) => {
  console.log(value);
})