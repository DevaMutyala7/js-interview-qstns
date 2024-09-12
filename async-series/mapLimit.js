function chunks(arr, limit) {
  const result = [];
  const newArr = [...arr];

  while (newArr.length) {
    result.push(newArr.splice(0, limit));
  }

  return result;
}

function mapLimit(arr, limit, callback) {
  let chunkedArr = chunks(arr, limit);

  return new Promise(async (resolve, reject) => {
    let final = chunkedArr.reduce((acc, curr) => {
      return acc.then((val) => {
        return new Promise((res, rej) => {
          const output = [];
          curr.forEach((elem) => {
            callback(elem, (err, num) => {
              if (err) {
                reject("Error");
              } else {
                output.push(num);
                if (output.length === curr.length) {
                  res([...val, ...output]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));

    resolve(final);
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
