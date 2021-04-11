/*
Iterator 迭代器:
定义: 满足迭代器协议的对象;
迭代器协议: 
对象内置 next() 方法, next() 方法是一个无参函数, 其返回一个对象, 对象拥有 done 和 value 两个属性;
1. done(boolean): 
* done === true, 表示迭代器已经经过了被迭代序列(并非表示不可迭代);
* done === false, 表示迭代器可以产生序列中的下一个值;
2. value: 迭代器返回的任意值, done == true 时可省略, value 省略值为 undefined;

简单理解: 迭代器就是在目标上创建了一个 next() 模拟"指针", 每次调用 next(), "指针"右移一位, 并返回当前"指针"所指的状态(done)和值(value);
注意: done === true 并不代表迭代器无法使用了, 此时仍可以调用 next(), "指针"仍然右移, 但其返回值为自定义值或省略值(此处为 undefined)而非被迭代序列的内部值;

你可以将迭代器理解为一个带由内置指针实现的对象, next() 实现指针操作, 每次执行 next(), 指针会返回当前所指的值和状态, 然后指针右移一位;
*/

// 迭代器简单实现
function createIterator(target) {
  // 迭代器实现用到了函数闭包的特性;
  let i = 0;
  // 1. 迭代器: 一个对象(满足迭代器协议), 包含一个 next() 方法;
  return {
    // 2. next() 方法;
    next() {
      let done = (i >= target.length);
      let value = done ? undefined : target[i++];
      // 返回包含 done 和 value 属性的对象;
      return { done, value }
    }
  }
}

// test
let iterator = createIterator([1,3,5]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// { done: false, value: 1 }
// { done: false, value: 3 }       
// { done: false, value: 5 }       
// { done: true, value: undefined }
// { done: true, value: undefined }
