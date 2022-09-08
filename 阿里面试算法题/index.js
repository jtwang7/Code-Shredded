// 实现一个 Task 类的链式调用，使符合预期
// TODO: 考察宏任务，微任务的管理实现
// 参考：https://junyiseo.com/frontend/938.html
class Task {
  // your code
  constructor() {
    /**
     * 维护一个任务队列
     * ! 我们的目的是手动实现代码阻塞执行，此处维护一个任务队列是必要的。
     * ! 我们需要分割划清每一个任务的边界:
     * ! 对于 log 任务，我们在执行完成后会立即执行; 对于 wait 任务，我们会设置 setTimeout 延迟执行;
     * ! 没有任务队列的手动控制，js 的异步机制会导致代码异步触发，无法阻塞。
     */
    this.tasks = [];
    // 开启任务，此处利用 setTimeout 将开启任务滞后到所有同步代码执行完毕。
    setTimeout(() => {
      this.executor();
    });
  }

  // 从任务队列中取出一个执行
  executor() {
    const task = this.tasks.shift();
    task && task();
    return this;
  }

  // 推入一个 console.log 方法，执行完毕后自动调用下一次任务执行
  log(value) {
    this.tasks.push(() => {
      console.log(value);
      this.executor();
    });
    return this;
  }

  // 推入一个等待，等待 time 秒后调用下一次任务执行
  wait(time) {
    this.tasks.push(() => {
      console.log(`...等待${time}秒`);
      setTimeout(() => {
        this.executor();
      }, time * 1000);
    });
    return this;
  }
}

new Task().log(1).log(2).wait(2).log(3).wait(1).log(4);
/**
 * 预期
 * 1
 * 2
 * ...等待2秒
 * 3
 * ...等待1秒
 * 4
 */
