async function mapSeries(arr, cb) {
  let output = [];
  return new Promise(async (res, rej) => {
    for (let item of arr) {
      await new Promise((resolve, reject) => {
        cb(item, (err, val) => {
          if (err) {
            reject("Errorrr");
          } else {
            resolve(val);
          }
        });
      })
        .then((val) => {
          output.push(val);
          if (output.length === arr.length) {
            res(output);
          }
        })
        .catch((err) => rej(err));
    }
  });
}

function execute(num, cb) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);

    if (num === 8) {
      cb(true);
    } else {
      cb(null, num);
    }
  }, 2000);
}

mapSeries([1, 2, 3, 5], execute)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
