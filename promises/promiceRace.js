Promise.prototype.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("promise 1 rejected"), 3000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("promise 2 rejected"), 2000);
});

Promise.prototype
  .myRace([promise1, promise2])
  .then((val) => console.log(val))
  .catch((err) => console.log("err", err));
