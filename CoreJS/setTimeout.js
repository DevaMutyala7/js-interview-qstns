function Close() {
  let queue = {};
  let timer = 0;

  function mySetTimeout(func, delay) {
    let current = timer++;

    queue[current] = { func, time: Date.now() + delay, id: current };

    return current;
  }

  function myClearTimeout(id) {
    if (queue[id]) {
      delete queue[id];
    }
  }

  function run() {
    for (let item in queue) {
      if (Date.now() > queue[item].time) {
        queue[item].func();
        myClearTimeout(queue[item].id);
      } else {
        requestIdleCallback(run);
      }
    }
  }

  requestIdleCallback(run);

  return { myClearTimeout, mySetTimeout };
}

let { myClearTimeout, mySetTimeout } = Close();

console.log("start");

let timer1 = mySetTimeout((a) => {
  console.log("timer 1 " + a);
}, 5000);

let timer2 = mySetTimeout(() => {
  console.log("timer 2");
}, 1000);

console.log("end");
