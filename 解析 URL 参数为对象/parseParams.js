function parseParams(url) {
  // 处理对象中重复 key 存储的场景
  const save = (obj, key, val) => {
    if (Reflect.has(obj, key)) {
      obj[key] = Array.isArray(obj[key]) ? [...obj[key], val] : [obj[key], val];
    } else {
      obj[key] = val;
    }
    return obj;
  }
  let paramsStr = /.+\?(.+)$/.exec(url)[1]; // 获取 url '?' 后的 query 参数字符串：'key1=value1&key2=value2&key3'
  let paramsArr = paramsStr.split('&'); // 分离键值对到数组中：['key1=value1', 'key2=value2', 'key3']
  let paramsObj = {};
  for (let param of paramsArr) {
    if (!(/=/.test(param))) {
      // 处理没有值的键值对：'key3'
      paramsObj = save(paramsObj, param, true)
    } else {
      let [key, value] = param.split('='); // 解构分割键值对
      let decodeValue = decodeURIComponent(value); // 对值进行解码
      decodeValue = /^\d+$/.test(decodeValue) ? parseFloat(decodeValue) : decodeValue; // 判断是否转为数字
      paramsObj = save(paramsObj, key, decodeValue); // 存储键值对
    }
  }
  return paramsObj;
}


console.log(parseParams('http://localhost:8080/user?key1=value1&key2=123&key2=456&key2=789&key3'));