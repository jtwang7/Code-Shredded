function ajax(method, url, data) {
  // GET 查询字符串编码后拼接
  function addURLParam(url, name, value) {
    url += (url.includes('?') ? '&' : '?');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
  }

  let promise = new Promise((resolve, reject) => {
    // 实例化 xhr 对象
    let xhr = new XMLHttpRequest();
    // 监听请求/响应过程所处的阶段
    xhr.onreadystatechange = function () {
      // 完全收到响应：readyState === 4
      if (xhr.readyState === 4) {
        // 判断状态码
        if (((xhr.state >= 200) && (xhr.state < 300)) || xhr.state === 304) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.status));
        }
      }
    };

    if (method.toUpperCase() === 'GET') {
      // GET 请求需要将查询字符串编码拼接
      for (let [key, value] of Object.entries(data)) {
        url = addURLParam(url, key, value);
      }
      xhr.open('GET', url, true);
      xhr.send(null);
    }

    if (method.toUpperCase() === 'POST') {
      xhr.open('POST', url, true);
      // POST 请求设置响应头
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=urf-8');
      xhr.send(data);
    }
  });

  return promise;
}