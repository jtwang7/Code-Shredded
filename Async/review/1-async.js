function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

function* gen() {
  let a = yield sleep();
  console.log(a);
  let b = yield sleep();
  console.log(b);
}

function fn(...args) {
  return spawn(gen)
}

function spawn(generator) {
  return new Promise((resolve, reject) => {
    let g = generator();

    function step(cb) {
      let res;
      try {
        res = cb();
      } catch (err) {
        reject(err);
      }
      if (res.done) {
        resolve(res.value);
        return;
      }
      Promise.resolve(res.value).then(function (val) {
        step(function () { return g.next(val) })
      }, function (err) {
        step(function () { return g.throw(err) })
      })
    }

    step(function () { return g.next() })
  })
}

fn();