// 外层封装, 形成闭包;
function debounce (func, wait) {
  let timer = null;
  // 返回真正用于绑定触发事件的函数;
  return function() {
    // 存储 this 指向: this 指向触发函数的事件对象;
    const context = this;
    const args = [...arguments]
    // 函数触发时, 先清除计时器, 停止之前正在计时的函数;
    clearTimeout(timer);
    // 重新设置计时器;
    timer = setTimeout(()=>{
      // 此处 apply 重新设置 this 是必要的, 尽管箭头函数 this 指向 function() {...} 的 this;
      // function() {...} 触发时 this 就是事件对象;
      // 但是执行的 func this 指向不能明确, 所以要 apply 强制指向事件对象;
      func.apply(context, args);
    }, wait);
  }
}