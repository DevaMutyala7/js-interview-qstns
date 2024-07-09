const timer = {
  timeout: [],
  setInterval: function (func, frequency) {
    let timer = window.setInterval(func, frequency);
    this.timeout.push(timer);
    return timer;
  },
  clearAllInterval: function () {
    while (this.timeout.length) {
      clearInterval(this.timeout.pop());
    }
  },
};

timer.setInterval(() => {
  console.log("this is occuring every 2 seconds");
}, 2000);

timer.clearAllInterval();
