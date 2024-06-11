function asyncReject(inputArr, callback) {
  return new Promise((res, rej) => {
    let count = 0;
    let output = [];
    inputArr.forEach((prom, index) => {
      callback(
        prom,
        (err, result) => {
          count++;
          if (err) {
            rej("Error");
          }
          if (!result) {
            output[index] = prom;
          }
          if (count === inputArr.length) {
            res(output.filter(Boolean));
          }
        },
        2000
      );
    });
  });
}

function execute(num, cb, delay) {
  setTimeout(() => {
    // num = num * 2;
    console.log("num", num);

    if (num === 7) {
      cb(true);
    } else {
      cb(null, num % 2 !== 0);
    }
  }, delay);
}

asyncReject([2, 4, 8, 9], execute)
  .then((val) => {
    console.log(val);
  })
  .catch((err) => console.log(err));
