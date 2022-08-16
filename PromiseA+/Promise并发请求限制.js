/**
 * @description:
 * * 利用到任务队列这种思想，在每次要执行“受限”任务时，判断当前正在执行的任务数量是否超过给定的上限.
 * * 如果未超过则立即执行这个“任务”；否则进入任务队列中等待执行。
 * * 参考链接：[js如何限制Promise“并发”的数量](https://www.jianshu.com/p/cc706239c7ef)
 */

// 类写法
class LimitPromise {
  constructor(max) {
    // 最大并发数
    this.MAX = max;
    // 当前运行中的请求个数
    this.count = 0;
    // 任务缓存队列
    this.taskWaitQueue = [];
  }

  /**
   * 调用方法：调用 caller，若当前为超出并发限制，则直接执行，若超出并发数，则添加入缓存队列延后执行
   * @param {*} caller 回调函数
   * @param {*} args 回调函数参数
   * @return 返回 Promise 对象
   */
  call(caller, args) {
    return new Promise((resolve, reject) => {
      if (this.count > this.MAX) {
        this.taskWaitQueue.push(() => {
          caller(...args)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            .finally(() => {
              // 执行完成一个请求，count - 1
              count--;
              // 若任务缓存队列中存在延后的任务，则取出执行
              if (this.taskWaitQueue.length) {
                const task = this.taskWaitQueue.shift();
                task();
              } else {
                return;
              }
            });
          // 重新调度了一个请求，count + 1
          count++;
          return;
        });
      } else {
        caller(...args).then(
          (res) => resolve(res),
          (err) => reject(err)
        );
      }
    });
  }
}

// 类写法：公共逻辑抽取
// 类写法
class LimitPromise {
  constructor(max) {
    // 最大并发数
    this.MAX = max;
    // 当前运行中的请求个数
    this.count = 0;
    // 任务缓存队列
    this.taskWaitQueue = [];
  }

  /**
   * 封装任务调度的回调函数
   * @param {*} caller 回调函数
   * @param {*} args 回调函数参数
   * @param {*} resolve
   * @param {*} reject
   * @returns 封装结果
   */
  _createTask(caller, args, resolve, reject) {
    return () => {
      caller(...args)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
        .finally(() => {
          // 执行完成一个请求，count - 1
          count--;
          // 若任务缓存队列中存在延后的任务，则取出执行
          if (this.taskWaitQueue.length) {
            const task = this.taskWaitQueue.shift();
            task();
          } else {
            return;
          }
        });
      // 重新调度了一个请求，count + 1
      count++;
      return;
    };
  }

  /**
   * 调用方法：调用 caller，若当前为超出并发限制，则直接执行，若超出并发数，则添加入缓存队列延后执行
   * @param {*} caller 回调函数
   * @param {*} args 回调函数参数
   * @returns 返回 Promise 对象
   */
  call(caller, args) {
    return new Promise((resolve, reject) => {
      const tasker = this._createTask(caller, args, resolve, reject);
      if (this.count > this.MAX) {
        this.taskWaitQueue.push(tasker);
      } else {
        tasker();
      }
    });
  }
}

// 函数写法
function limitPromise(max) {
  const MAX = max;
  let count = 0;
  let taskWaitQueue = [];

  const _createTask = (caller, args, resolve, reject) => {
    return () => {
      caller(...args)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
        .finally(() => {
          // 执行完成一个请求，count - 1
          count--;
          // 若任务缓存队列中存在延后的任务，则取出执行
          if (taskWaitQueue.length) {
            const task = taskWaitQueue.shift();
            task();
          } else {
            return;
          }
        });
      // 重新调度了一个请求，count + 1
      count++;
      return;
    };
  };

  const call = (caller, args) => {
    return new Promise((resolve, reject) => {
      const tasker = _createTask(caller, args, resolve, reject);
      if (count > MAX) {
        taskWaitQueue.push(tasker);
      } else {
        tasker()
      }
    });
  };

  return call;
}
