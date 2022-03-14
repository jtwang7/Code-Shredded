// 生成无序&不重复的随机整数
function generate(count, range) {
  const res = []
  while (count) {
    const randomNum = parseInt(Math.random() * range) + 1;
    if (res.includes(randomNum)) {
      continue;
    } else {
      res.push(randomNum);
      count--;
    }
  }
  return res;
}