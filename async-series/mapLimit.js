function mapLimit(arr, limit, callback) {
  let output = [];

  function getChunks(arr, limit) {
    if (arr.length <= limit) {
      return [arr];
    }

    let res = [arr.slice(0, limit)];

    let remainingArr = arr.slice(limit);

    return res.concat(getChunks(remainingArr, limit));
  }

  return new Promise(async (res, rej) => {
    let newArr = getChunks(arr, limit);
    console.log("newArr", newArr);
    for (let i = 0; i < newArr.length; i++) {
      console.log(`batch ${i + 1}`);
      for (let item of newArr[i]) {
        await new Promise((resolve, reject) => {
          callback(item, (err, val) => {
            if (err) {
              reject(err);
            } else {
              resolve(val);
            }
          });
        })
          .then((val) => {
            output.push(val);
            if (output.length >= arr.length) {
              res(output);
            }
          })
          .catch((err) => {
            rej(err);
          });
      }
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

mapLimit([1, 2, 3, 5, 7, 9], 2, execute)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
