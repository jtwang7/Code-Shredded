// 待解决问题：
// promise.all() 执行过程中，若某一个 promise 失败， 会导致整个 promises 失败。

// 解决思路：
// 在传入 promises 数组前，提前对所有 promise 做错误捕获。
// 这样做的目的：
// 1. 防止错误向下传递。
// 2. promise.catch() 结果会被 Promise.resolve() 包裹，状态为 resolved。

// 参考：https://blog.csdn.net/zwwgoodwill/article/details/105050693?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-105050693-blog-121631640.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-105050693-blog-121631640.pc_relevant_paycolumn_v3&utm_relevant_index=2
Promise.all([p1, p2, p3].map(p => p.catch(e => e)))
  .then(values => {
    console.log(values);
  }).catch(err => {
    console.log(err);
  })