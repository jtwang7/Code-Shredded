function jsonp({url, params, callback}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    }
    let arrs = [];
    params = {...params, callback};
    for (let [key, value] of params) {
      arrs.push(`${key}=${value}`);
    }
    script.src = `${url}?${arrs.join('&')}`;
    document.body.appendChild(script);
  })
}