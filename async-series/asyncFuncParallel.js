function async(i) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(i);
    }, 1000 * i);
  });
}

function parallelExecutor(promises, callback) {
  let fulfilled = [];
  let count = 0;
  promises.forEach((promise, index) => {
    promise.then((val) => {
      fulfilled[index] = val;
      count++;
      if (count === promises.length) {
        callback(fulfilled);
      }
    });
  });
}

let async4 = async(4);
let async2 = async(2);
let async3 = async(3);

parallelExecutor([async4, async2, async3], (result) =>
  console.log("result", result)
);
