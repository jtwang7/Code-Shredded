/*
Iterable 可迭代对象:
定义: 满足可迭代协议的对象;
可迭代协议: 对象包含 [Symbol.iterator] 属性(Symbol 在对象中通过 [] 调用), 其值是一个无参函数, 该函数返回一个迭代器;
ES6 内置可迭代对象:
1. Array
2. Map
3. Set
4. String
5. TypedArray
6. arguments
7. NodeList

可迭代对象可被用于: 
1. for...of...
2. 扩展运算符(...)
3. yield*
4. 解构赋值

注意: 
1. 迭代器对象不能用于 for...of, 解构赋值等操作, 需要包装成可迭代对象;
2. for..of, 解构赋值等操作都会"消耗"迭代器(迭代一遍后, 可迭代对象内的迭代器 done === ture), 因此无法多次对同一可迭代对象执行迭代操作;
*/

// 可迭代对象实现: 包装一个迭代器, 并通过 [Symbol.iterator] 暴露;
function createIterable(target) {
  let i = 0;
  return {
    // 比迭代器多实现了一个 [Symbol.iterator], 返回迭代器;
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let done = (i >= target.length);
      let value = !done ? target[i++] : undefined;
      return { done, value }
    }
  }
}

// 普通对象没有实现可迭代协议, 我们可以向 Object 原型内添加 [Symbol.iterator] 属性, 使其成为可迭代对象;
Object.prototype[Symbol.iterator] = function () {
  // 将对象转为数组[[key,value],...]
  let target = Object.entries(this);
  let i = 0;
  return {
    next() {
      let done = (i >= target.length)
      let value = !done ? target[i++] : undefined;
      return { done, value }
    }
  }
}

// test
let iterable = createIterable([1, 3, 5]);
console.log(...iterable);
// 1 3 5

// 对象字面量调用了 new Object()
let obj = {
  name: 'Jimmy',
  age: 18,
  job: 'actor',
}
console.log(...obj);
// [ 'name', 'Jimmy' ] [ 'age', 18 ] [ 'job', 'actor' ]
