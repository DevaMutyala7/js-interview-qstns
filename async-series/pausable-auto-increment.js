function PausableIncrement() {
  let timer;

  this.count = 0;

  this.start = () => {
    if (!timer) {
      timer = setInterval(() => {
        this.count++;
        console.log(this.count);
      }, 1000);
    }
  };

  this.stop = () => {
    clearInterval(timer);
    timer = null;
  };

  return this;
}

let counter1 = PausableIncrement();
counter1.start();
setTimeout(() => {
  counter1.stop();
}, 5000);

setTimeout(() => {
  counter1.start();
}, 7000);
