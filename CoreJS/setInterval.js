function createSetInterval() {
  let timer = 0;
  let queue = {};

  const mySetInterval = (func, frequency) => {
    let currentId = timer++;

    queue[currentId] = {
      func,
      time: frequency + Date.now(),
      id: currentId,
      frequency,
    };

    return currentId;
  };

  const myClearInterval = (id) => {
    if (queue[id]) {
      delete queue[id];
    } else {
      throw new Error("No setInterval registerd with this id");
    }
  };

  const runSetInterval = () => {
    for (let i in queue) {
      if (Date.now() > queue[i].time) {
        queue[i].func();
        queue[i].time = Date.now() + queue[i].frequency;
      } else {
        requestIdleCallback(runSetInterval);
      }
    }
  };

  requestIdleCallback(runSetInterval);

  return { mySetInterval, myClearInterval };
}

const { mySetInterval, myClearInterval } = createSetInterval();

console.log("start");

let interval1 = mySetInterval(() => {
  console.log("interval 1");
}, 3000);

let interval2 = mySetInterval(() => {
  console.log("interval 2");
}, 2000);

console.log("end");
