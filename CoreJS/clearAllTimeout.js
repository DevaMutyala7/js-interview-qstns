const timer = {
  timeout: [],
  setTimeout: function (func, delay) {
    let timerId = window.setTimeout(func, delay);
    this.timeout.push(timerId);
    return timerId;
  },
  clearAllTimeout: function (func, delay) {
    while (this.timeout.length) {
      clearTimeout(this.timeout.pop());
    }
  },
};

timer.setTimeout(() => {
  console.log("a is not b");
}, 1000);

timer.setTimeout(() => {
  console.log("b is not c");
}, 1000);

timer.setTimeout(() => {
  console.log("c is not d");
}, 3000);

timer.clearAllTimeout();
