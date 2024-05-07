function mapSeries(arr, cb) {
  return new Promise((resolve, reject) => {
    let final = arr.reduce((acc, curr) => {
      return acc.then((value) => {
        return new Promise((res, rej) => {
          cb(curr, (err, val) => {
            if (err) {
              rej(err);
            } else {
              res([...value, val]);
            }
          });
        });
      });
    }, Promise.resolve([]));

    return final.then((val) => resolve(val)).catch((err) => reject(err));
  });
}

let prom = mapSeries([1, 2, 3, 4, 5, 6], async function (num, cb) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);
    if (num === 12) {
      cb(true);
    } else {
      cb(null, num);
    }
  }, 1000);
});

prom
  .then((res) => console.log("success" + res))
  .catch((_) => console.log("no success"));
