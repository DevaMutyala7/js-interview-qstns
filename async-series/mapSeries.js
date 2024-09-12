function mapSeries(arr, cb) {
  return new Promise(async (resolve, reject) => {
    let finalRes = arr.reduce((acc, curr) => {
      return acc.then((val) => {
        return new Promise((res, rej) => {
          cb(curr, (err, num) => {
            if (err) {
              rej("Error");
            } else {
              res([...val, num]);
            }
          });
        });
      });
    }, Promise.resolve([]));

    resolve(finalRes);
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
