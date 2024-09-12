Promise.prototype.allSettled = function (promises) {
  let promiseFullfilled = 0;
  let result = [];
  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          result[index] = { status: "fulfilled", value: val };
        })
        .catch((err) => {
          result[index] = { status: "rejected", reason: err };
        })
        .finally(() => {
          promiseFullfilled++;
          if (promiseFullfilled === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

let promise1 = new Promise((_, reject) => {
  setTimeout(() => reject("promise 1 rejected"), 3000);
});

let promise2 = new Promise((resolve) => {
  setTimeout(() => resolve("promise 2 resolved"), 2000);
});

let promise3 = new Promise((resolve) => {
  setTimeout(() => resolve("promise 3 resolved"), 2000);
});

Promise.prototype
  .allSettled([promise1, promise2, promise3])
  .then((val) => console.log(val));
