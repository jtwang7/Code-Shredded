// 非立即执行版节流(计时器)
// function throttle(fn, wait) {
//   let timer = null;
//   return function (...args) {
//     const ctx = this;
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.call(ctx, args);
//         timer = null;
//       }, wait)
//     }
//   }
// }

// 立即执行版节流(时间戳)
// function throttle(fn, wait) {
//   let preTime = 0;
//   return function (...args) {
//     const ctx = this;
//     let curTime = new Date().getTime();
//     if (curTime - preTime > wait) {
//       fn.call(ctx, args);
//       preTime = new Date().getTime();
//     }
//   }
// }

// 合并版节流
// function throttle(fn, wait) {
//   let timer = null, preTime = 0;
//   return function (...args) {
//     const ctx = this;
//     let curTime = new Date().getTime();
//     if (curTime - preTime > wait) {
//       if (timer) {
//         clearTimeout(timer);
//         timer = null;
//       }
//       fn.call(ctx, args);
//       preTime = new Date().getTime();
//     } else if (!timer) {
//       timer = setTimeout(()=>{
//         preTime = new Date().getTime();
//         fn.call(ctx, args);
//         timer = null;
//       },wait-(curTime-preTime))
//     }
//   }
// }

// 可控合并版节流
function throttle(fn, wait, options) {
  let timer = null, preTime = 0;

  return function (...args) {
    const ctx = this;
    let curTime = new Date().getTime();
    if (!options.leading && preTime === 0) preTime = curTime;
    if (curTime - preTime > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.call(ctx, args);
      preTime = new Date().getTime();
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        fn.call(ctx, args);
        timer = null;
        preTime = options.leading ? new Date().getTime() : 0;
      }, wait - (curTime - preTime))
    }
  }
}