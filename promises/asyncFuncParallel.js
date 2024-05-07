function async(i) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(i);
    }, 1000 * i);
  });
}

function parallelExecutor(promises, callback) {
  let ans = [];
  let count = 0;
  promises.forEach((promise, index) => {
    promise.then((val) => {
      ans[index] = val;
      count++;
      if (count === promises.length) {
        callback(ans);
      }
    });
  });
}

let async1 = async(1);
let async2 = async(2);
let async3 = async(3);

parallelExecutor([async3, async1, async2], (result) =>
  console.log("result", result)
);
