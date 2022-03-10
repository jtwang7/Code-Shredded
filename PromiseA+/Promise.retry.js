/**
 * Promise retry 方法实现：在一定次数内，若请求失败，可重新发送请求
 * @param {*} fn 回调函数
 * @param {*} times 请求次数
 * @returns Promise
 */

// async + while + try...catch 写法
Promise.prototype.retry1 = (fn, times) => {
  return new Promise(async (resolve, reject) => {
    while (times) {
      times--; // 消耗一次请求次数
      try {
        // 若成功，则传递数据并跳出循环
        let res = await fn();
        console.log('执行成功');
        resolve(res);
        break;
      } catch (err) {
        // 报错：判断是否存在下次请求机会
        if (!times) {
          console.log('Error: No more times, now rejected.');
          reject(err);
        } else {
          console.log('try again...');
        }
      }
    }
  })
}

// 递归写法
Promise.prototype.retry2 = function (fn, times) {
  return new Promise((resolve, reject) => {
    fn()
      .then((data) => {
        // 成功执行,返回结果
        console.log('执行成功');
        resolve(data);
      }) 
      .catch(err => {
        if (times > 0) {
          // 若还存在重试次数,重新调用请求方法,同时消耗一次重试次数
          console.log('try again...');
          resolve(Promise.prototype.retry2(fn, times - 1));
        } else {
          // 失败
          console.log('Error: No more times, now rejected.');
          reject(err);
        }
      })
  })
}

// test
function getProm() {
  const n = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => n > 0.5 ? resolve(n) : reject(n), 1000);
  });
}
Promise.prototype.retry1(getProm, 5).then(data => { console.log(data); }, err => { console.log(err); });
// Promise.prototype.retry2(getProm, 5).then(data => { console.log(data); }, err => { console.log(err); });