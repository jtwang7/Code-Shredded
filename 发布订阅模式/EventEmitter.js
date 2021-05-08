class EventEmitter {
  // 版本号
  static VERSION = '1.0.0';

  constructor() {
    // "调度中心": 存放订阅事件及其维护的回调队列;
    this.store = {}
  }

  /**
   * 订阅：注册事件
   * @param {String | Array} event - 注册到调度中心的事件名
   * @param {Function} fn - 事件回调函数
   * @returns 链式调用
   */
  on(event, fn) {
    try {
      if (!event || !fn) throw new Error('缺少参数, 请检查...');
      // 事件名可以数组形式传入, 为所有事件逐个注册回调函数;
      if (this.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
          this.on(event[i], fn);
        }
      } else {
        // 每个事件维护一个回调队列;
        // 订阅(注册)事件: 将回调函数推入队列;
        (this.store[event] || (this.store[event] = [])).push(fn);
      }
    } catch (err) {
      console.log(err);
    }
    return this;
  }

  /**
   * 发布事件
   * @param {String} event - 事件名
   * @param  {...any} args - 回调函数额外参数
   * @returns 
   */
  emit(event, ...args) {
    try {
      let eventCallbacks = this.store[event];
      if (!eventCallbacks) {
        throw new Error('event 不存在...')
      } else {
        for (let cb of eventCallbacks) {
          // 发布事件: 清空相应事件的回调队列
          cb.call(this, ...args)
        }
      }
    } catch (err) {
      console.log(err);
    }
    return this;
  }

  /**
   * 删除订阅
   * @param {String} event - 事件名
   * @param {Function} fn - 要删除的目标回调
   * @returns 链式调用
   */
  off(event, fn) {
    // 未传入事件名 or 不存在传入事件名;
    if (!event || !this.store[event]) return this;
    if (!fn) {
      // 未传入目标回调, 默认删除注册的事件;
      Reflect.deleteProperty(this.store, event);
    } else {
      // 若指定删除的回调函数, 则匹配对应的函数并将其从回调队列中移除;
      for (let i = 0; i < this.store[event].length; i++) {
        // 注: 回调队列中函数需与传入的目标回调严格匹配, 若注册时传入的是匿名函数, 则无法移除;
        if (this.store[event][i] === fn || this.store[event][i].fn === fn) {
          this.store[event].splice(i, 1)
        }
      }
    }
    return this;
  }

  /**
   * 添加事件，该事件仅被执行一次
   * @param {String} event - 事件名
   * @param {Function} fn - 注册的回调函数
   * @returns 链式调用
   */
  once(event, fn) {
    let vm = this;
    // 在注册的回调函数外封装一层函数(主要用到闭包特性), 调用注册的回调后立即移除回调;
    function rm(...args) {
      fn.call(vm, ...args)
      this.off(event, rm)
    }
    // 此处将 fn 挂载在 rm (本质是对象)上, 是为了能够通过 off() 手动删除 once 订阅的事件;
    // 若不挂载 fn, 通过 once 注册的 fn 只能通过访问一次后自动被移除出回调队列;
    rm.fn = fn;
    this.on(event, rm);
    return this;
  }

  /**
   * 判断目标是否为数组
   * @param {Any} val - 检测目标
   * @returns 若为数组类型, 返回 true
   */
  isArray(val) {
    if (!Array.isArray) {
      // 兼容 ES5 以下版本
      return Object.prototype.toString.call(val) === '[object Array]'
    } else {
      // ES5 及其以上版本
      return Array.isArray(val);
    }
  }
}

export default EventEmitter;