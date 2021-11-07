function unique1(arr) {
  return [...new Set(arr)]
}

function unique2(arr) {
  return Array.from(new Set(arr));
}

function unique3(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(i, 1);
        j--;
      }
    }
  }
  return arr;
}

function unique4(arr) {
  let sup = [];
  for (let i = 0; i < arr.length; i++) {
    if (sup.indexOf(arr[i]) === -1) {
      sup.push(arr[i]);
    }
  }
  return sup;
}

function unique5(arr) {
  arr.filter((item, idx) => {
    return (arr.indexOf(item, 0) === idx)
  })
  return arr;
}

function unique6(arr) {
  return arr.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : [...prev, cur];
  }, [])
}

function unique7(arr) {
  const map = {};
  return arr.filter((item, idx) => (
    map.hasOwnProperty(typeof item + item) ? false : Reflect.set(map, typeof item + item, true)
  ))
}

function unique8(arr) {
  const map = new Map();
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(typeof arr[i] + arr[i])) {
      res.push(arr[i]);
      map.set(typeof arr[i] + arr[i], true);
    }
  }
  return res;
}