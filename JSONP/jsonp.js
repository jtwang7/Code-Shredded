function jsonp({ url, params, callback }) {
  // json 是异步操作，返回一个Promise
  return new Promise((resolve, reject) => {
    let script = document.createElement('script'); // 创建一个<script>
    // 将回调挂载在全局对象上
    window[callback] = (data) => {
      resolve(data);
      document.body.removeChild(script);
    }
    // 组织参数字符串
    params = { ...params, callback, };
    let query = [];
    for (let [key, value] of params) {
      query.push(`${key}=${value}`);
    }
    // 赋值到src属性
    script.src = `${url}?${query.join('&')}`;
    // 将<script>添加到DOM树
    document.body.appendChild(script);
  })
}

jsonp({
  url: 'http://localhost:3000/say',
  params: {
    msg:'i love you'
  },
  callback: 'show',
}).then((data) => {
  console.log(data); // data: show('xxx')
})