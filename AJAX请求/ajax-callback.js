function ajax(method, url, data, fn) {
  // GET 查询字符串编码后拼接
  function addURLParam(url, name, value) {
    url += (url.includes('?') ? '&' : '?');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
  }
  
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    try {
      if (xhr.readyState === 4) {
        if (((xhr.status >= 200) && (xhr.status < 300)) || (xhr.status === 304)) {
          fn.call(this, xhr.responseText);
        } else {
          console.log(new Error(xhr.status));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

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
}