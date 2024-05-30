Promise.prototype.myFinally = function (callback) {
  if (typeof callback !== "function") {
    return Promise.then();
  }

  return new Promise((res, rej) => {
    this.then(() => res(callback())).catch(() => rej(callback()));
  });
};

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("promise 1 rejected"), 300);
});

promise1
  .then((val) => console.log(val))
  .catch((err) => console.log("err", err))
  .myFinally(() => console.log("finally"));
