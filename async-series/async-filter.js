function asyncFilter(inputArr, callback) {
  return new Promise((resolve, reject) => {
    let output = [];
    let count = 0;
    inputArr.forEach((item, index) => {
      callback(
        item,
        (err, res) => {
          count++;
          if (err) {
            reject("Error");
          }
          if (res) {
            output[index] = item;
          }
          if (count >= inputArr.length) {
            resolve(output.filter(Boolean));
          }
        },
        item * 1000
      );
    });
  });
}

function execute(num, cb, delay) {
  setTimeout(() => {
    num = num * 2;
    console.log("num", num);

    if (num === 7) {
      cb(true);
    } else {
      cb(null, num !== 4);
    }
  }, delay);
}

asyncFilter([1, 2, 3, 7], execute)
  .then((val) => {
    console.log(val);
  })
  .catch((err) => console.log(err));
