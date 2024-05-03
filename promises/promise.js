const State = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #state = undefined;
  #value = undefined;
  #handlers = [];

  constructor(cb) {
    this.#state = State.PENDING;

    try {
      let resolve = this.#resolve.bind(this);
      let reject = this.#reject.bind(this);
      cb(resolve, reject);
    } catch (err) {
      this.#reject(err);
    }
  }

  #resolve(val) {
    this.#updateResults(State.FULFILLED, val);
  }

  #reject(err) {
    this.#updateResults(State.REJECTED, err);
  }

  #updateResults(state, value) {
    setTimeout(() => {
      if (this.#state !== State.PENDING) return;

      if (value instanceof MyPromise) {
        return this.then(this.#resolve, this.#reject);
      }

      this.#state = state;
      this.#value = value;

      this.#executeHandlers();
    }, 0);
  }

  #executeHandlers() {
    if (this.#state === State.PENDING) return;

    this.#handlers.forEach((handler) => {
      if (this.#state === State.FULFILLED) {
        handler.onSuccess(this.#value);
      } else {
        handler.onFail(this.#value);
      }
    });
  }

  #addHandlers(handler) {
    this.#handlers.push(handler);
    this.#executeHandlers();
  }

  then(onSuccess, onFail) {
    return new MyPromise((resolve, reject) => {
      this.#addHandlers({
        onSuccess: (val) => {
          if (!onSuccess) {
            return resolve(val);
          }
          try {
            return resolve(onSuccess(val));
          } catch (err) {
            return reject(err);
          }
        },
        onFail: (val) => {
          if (!onFail) {
            return reject(val);
          }

          try {
            return resolve(onFail(val));
          } catch (err) {
            return reject(err);
          }
        },
      });
    });
  }

  catch(err) {
    return this.#reject(err);
  }

  finally(callback) {
    return new MyPromise((res, rej) => {
      this.then(
        (val) => res(callback()).then(() => val),
        (err) =>
          rej(callback()).catch(() => {
            throw err;
          })
      );
    });
  }

  static all(promises) {
    let settledPromises = [];
    let resolvedPromises = 0;

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise
          .then((val) => {
            resolvedPromises++;
            settledPromises[index] = val;
            if (resolvedPromises >= promises.length) {
              resolve(settledPromises);
            }
          })
          .catch((err) => reject(err));
      });
    });
  }
}

let p1 = new MyPromise((res, rej) =>
  setTimeout(() => {
    res("p1 is resolved");
  }, 5000)
);

let p2 = new MyPromise((res, rej) =>
  setTimeout(() => {
    res("p2 is resolved");
  }, 3000)
);

MyPromise.all([p1, p2]).then((val) => console.log(val));

const testPromiseWithLateResolve = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("Promise 1 is resolved");
  }, 3000);
});

testPromiseWithLateResolve
  .then((val) => {
    console.log(val);
  })
  .finally(() => console.log("in finally"))
  .then(() => console.log("in chaining"));
