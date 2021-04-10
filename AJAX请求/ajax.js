function ajax(options) {
  let xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // 兼容 IE5, IE6
    xhr = new ActiveXObject();
  }

  // 初始化配置项
  options = options || {}; // 配置项是否为空
  options.type = (options.type || 'GET').toUpperCase(); // 请求方式统一大写, 默认 GET 请求
  options.dataType = options.dataType || 'json'; // 默认请求体 json 格式

  if (options.type === 'GET') {
    xhr.open(options.type, options.url, true);
    xhr.send();
  } else if (options.type === 'POST') {
    // 创建并初始化请求
    xhr.open(options.type, options.url, true);
    // POST 请求需设置请求头格式
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
    // 发送请求
    xhr.send();
  }
  
  // 设置请求状态值改变对应触发的回调函数
  xhr.onreadystateChange = function() {
    if (xhr.readyState === 4) {
      // 注: 只有当 readyState === 4, 即完整执行一次请求后, 服务端才返回 status
      if (xhr.status >=200 && xhr.status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(xhr.status, xhr.statusText);
      }
    }
  }
}

// ajax({
//   type: 'GET',
//   url: 'httpbin.org',
//   success: function(text, json) {
//     console.log(text);
//   },
//   fail: function(status, text) {
//     console.log(status);
//   }
// })