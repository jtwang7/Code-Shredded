/**
  * 题目： 对象扁平化，不考虑环引用的情况
  * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
  * 示例：
  *   let input = {
  *     a: 1,
  *     b: [ 1, 2, { c: true }, [ 3 ] ],
  *     d: { e: 2, f: 3 },
  *     g: null, 
  *   }
  
  *   let output = flatten(input);
  *   output如下
  *   {
  *     "a": 1,
  *     "b[0]": 1,
  *     "b[1]": 2,
  *     "b[2].c": true,
  *     "b[3][0]": 3,
  *     "d.e": 2,
  *     "d.f": 3,
  *     // "g": null,  值为null或者undefined，丢弃
  *  }
*/

function flatten(input) {
  let res = {}; // 闭包存储扁平化结果
  /**
   * 扁平化
   * @param {any} input 输入数据
   * @param {string} parentKey 父级Key值
   * @returns 
   */
  const fn = (input, parentKey = '') => {
    // 若输入为null或undefined，则跳过
    if (input === null || input === undefined) return;
    if (Object.prototype.toString.call(input) === '[object Array]') {
      // 若输入为一个数组，递归展平该数组
      for (let i = 0; i < input.length; i++) {
        const newKey = parentKey ? `${parentKey}[${i}]` : i; // 为每个元素生成对应的Key值
        fn(input[i], newKey); // 递归
      }
    } else if (Object.prototype.toString.call(input) === '[object Object]') {
      // 若输入为一个对象，递归展平该对象
      for (let [key, value] of Object.entries(input)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key; // 为每个元素生成对应的Key值
        fn(value, newKey); // 递归
      }
    } else {
      // 递归到原始类型时，存入结果
      res[parentKey] = input;
    }
  }
  fn(input);
  return res;
}


// test
let input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
}
let res = flatten(input);
console.log(res);