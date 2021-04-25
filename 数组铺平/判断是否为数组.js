/**
 * 判断对象是否为数组的几种方式:
 * 1. instanceof
 * 2. constructor
 * 3. Object.prototype.toString.call()
 * 4. Array.isArray()
 */

// ===========================
/**instanceof
 * 原理: 检验构造函数的 prototype 属性(原型)是否出现在被检测对象的原型链中的任何位置, 返回一个布尔值;
 * 优点: 可以检测原始类型, 对象, 以及数组\函数等其他引用类型;
 * 缺点: 构造函数的 prototype 属性可被修改, 因此不能保证结果正确; 当脚本有多个全局环境时(如 html 中有多个 iframe 对象), 新的全局环境会创建属于自己的构造函数 prototype 属性对象,
 */
const arr1 = [1,2,3,4,5,6]
console.log(arr1 instanceof Array);




// ============最终方案===========
// Array.isArray = false

function isArray(arr) {
  function isArrFunc (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  return Array.isArray ? Array.isArray(arr) : isArrFunc(arr)
}

// console.log(isArray(arr1));
