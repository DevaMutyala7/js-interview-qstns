const STATUS = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class MyPromise {
  constructor(cb) {
    this.status = STATUS.PENDING;
    this.handlers = [];
    this.value = undefined;

    try {
      cb(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value) => {
    this.#updateHandler(STATUS.RESOLVED, value);
  };

  reject = (err) => {
    this.#updateHandler(STATUS.REJECTED, err);
  };

  #addHandlers = (handler) => {
    this.handlers.push(handler);
    this.#executeHandlers();
  };

  #updateHandler = (status, value) => {
    if (status === STATUS.PENDING) {
      return;
    }

    if (value instanceof MyPromise) {
      value.then(this.resolve, this.reject);
    }

    this.status = status;
    this.value = value;

    this.#executeHandlers();
  };

  #executeHandlers = () => {
    setTimeout(() => {
      if (this.status === STATUS.PENDING) {
        return;
      }
      this.handlers.forEach((handler) => {
        if (this.status === STATUS.RESOLVED) {
          handler.onSuccess(this.value);
        } else {
          handler.onFailure(this.value);
        }
      });
      this.handlers = [];
    }, 0);
  };

  then = (onSuccess, onFailure) => {
    return new MyPromise((res, rej) => {
      this.#addHandlers({
        onSuccess: (val) => {
          if (onSuccess) {
            try {
              return res(onSuccess(val));
            } catch (err) {
              return rej(err);
            }
          } else {
            return res(val);
          }
        },
        onFailure: (err) => {
          if (onFailure) {
            try {
              return rej(onFailure(err));
            } catch (err) {
              return rej(err);
            }
          } else {
            return rej(err);
          }
        },
      });
    });
  };

  catch = (cb) => {
    return this.then(null, cb);
  };

  finally(cb) {
    return new MyPromise((res, rej) => {
      this.then(() => {
        res(cb());
      }).catch(() => {
        res(cb());
      });
    });
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise((res, rej) => {
    res(val);
  });
};

MyPromise.reject = function (err) {
  return new MyPromise((res, rej) => {
    rej(err);
  });
};

MyPromise.all = function (promises) {
  let resolvedPromises = [];
  let count = 0;
  return new MyPromise((res, rej) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          resolvedPromises[index] = val;
          count++;
          if (count === promises.length) {
            res(resolvedPromises);
          }
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
};

MyPromise.race = function (promises) {
  return new MyPromise((res, rej) => {
    promises.forEach((promise) => {
      promise
        .then((val) => {
          res(val);
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
};

MyPromise.any = function (promises) {
  let rejectedPromises = [];
  let count = 0;
  return new MyPromise((res, rej) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          res(val);
        })
        .catch((err) => {
          rejectedPromises[index] = err;
          count++;
          if (count === promises.length) {
            rej(rejectedPromises);
          }
        });
    });
  });
};

MyPromise.allSettled = function (promises) {
  let fulfilled = [];
  let count = 0;

  return new MyPromise((res, rej) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          fulfilled[index] = val;
          count++;
          if (count === promises.length) {
            res(fulfilled);
          }
        })
        .catch((err) => {
          fulfilled[index] = err;
          count++;
          if (count === promises.length) {
            res(fulfilled);
          }
        });
    });
  });
};

MyPromise.withResolvers = function () {
  let resolve;
  let reject;
  let promise = new MyPromise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

let p1 = new MyPromise((res, rej) => {
  // if (Math.random() * 10 > 5) {
  //   rej(new Error("error"));
  // } else {
  setTimeout(() => {
    res("resolved");
  }, 1000);
  // }
});

let p2 = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("resolved p2");
  }, 3000);
});

let p3 = MyPromise.resolve("resolved p3");

let p4 = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej("rejected p4");
  }, 3000);
});

p1.then((val) => console.log(val))
  .catch((err) => console.log("err", err))
  .finally(() => console.log("in finally"))
  .then(() => console.log("after finally in then"));

MyPromise.all([p1, p2, p3]).then((ans) => {
  console.log("all", ans);
  console.log("-------All-------");
});

MyPromise.race([p1, p2, p3])
  .then((ans) => {
    console.log("race", ans);
    console.log("-------Race-------");
  })
  .catch((err) => {
    console.log("Err", err);
    console.log("-------Race Err-------");
  });

MyPromise.any([p1, p2, p4])
  .then((ans) => {
    console.log("any", ans);
    console.log("-------Any-------");
  })
  .catch((err) => {
    console.log("any err", err);
    console.log("-------Any Err-------");
  });

MyPromise.allSettled([p1, p2, p4]).then((val) => {
  console.log("all settled", val);
  console.log("-------All Settled-------");
});

function asyncFunc() {
  console.log("making network calls.....");
  return new MyPromise((res, rej) => {
    setTimeout(() => {
      res({ enabled: true });
    }, 5000);
  });
}

let promise;
async function getFeatureFlag(flag) {
  if (!promise) {
    promise = MyPromise.withResolvers();
    let res = await asyncFunc();
    promise.resolve(res);
  }

  return promise?.promise?.then((flags) => flags[flag] || false);
}

getFeatureFlag("enabled").then((val) => {
  console.log({ enabled: val });
});

getFeatureFlag("enabled").then((val) => {
  console.log({ enabled: val });
});

getFeatureFlag("enabled").then((val) => {
  console.log({ enabled: val });
});

getFeatureFlag("enabled").then((val) => {
  console.log({ enabled: val });
});
