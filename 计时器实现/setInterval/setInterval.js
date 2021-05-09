function mySetInterval(callback, interval, ...args) {
  let prev = +new Date();
  let timer = null, now = null;

  const check = () => {
    timer = window.requestAnimationFrame(check);
    now = +new Date();
    if ((now - prev) >= interval) {
      callback.call(null, ...args);
      prev = +new Date();
    }
  }

  timer = window.requestAnimationFrame(check);
}

export default mySetInterval