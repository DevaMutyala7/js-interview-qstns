function throttleTasks(tasks, count, delay, callback) {
  let lastRan = false;
  let queue = [];

  return function () {
    if (!lastRan) {
      queue = [...queue, ...tasks];

      let executable = queue.splice(0, count);

      callback(executable);

      lastRan = true;

      setTimeout(() => {
        lastRan = false;
      }, delay);
    }
  };
}

const btn = document.getElementById("btn");
btn.addEventListener(
  "click",
  throttleTasks([1, 2, 3, 4, 5, 6, 7, 8], 3, 3000, (task) => console.log(task))
);
