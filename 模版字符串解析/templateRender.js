function templateRender(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 正则匹配 '{{key}}': 模板字符串内实际对应 data 的 key 值，之后会用 data[key] 来替换整个匹配项

  if (!reg.test(template)) return template; // 递归终止条件
  // 若模板中存在模板字符串
  const key = reg.exec(template)[1]; // 匹配到 `{{}}` 后停止匹配，返回一个 Array，包含匹配到的整个字符串以及其分组`(\w+)`，分组结果就是 data 对应的 key
  template = template.replace(reg, data[key]); // 将匹配的模板字符串替换为真实值, 此时完成第一轮替换
  return templateRender(template, data); // 递归替换后续所有的模板字符串
}


let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12
}
console.log(templateRender(template, person));