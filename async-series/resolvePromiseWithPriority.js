function resolvePromiseWithPriority(promises) {
  let resolved = {};
  let rejected = {};
  let tasksCompleted = 0;
  let maxPriority = 0;
  promises = promises.sort((a, b) => a.priority - b.priority);

  return new Promise((resolve, reject) => {
    promises.forEach(({ status, priority }) => {
      status
        .then((value) => {
          resolved[priority] = value;
        })
        .catch(() => {
          rejected[priority] = true;

          if (priority === promises[maxPriority].priority) {
            maxPriority++;
          }
        })
        .finally(() => {
          if (
            !rejected[priority] &&
            priority === promises[maxPriority].priority
          ) {
            console.log(rejected);
            resolve(resolved);
          }
          tasksCompleted++;

          if (tasksCompleted === promises.length) {
            reject(`All Api's failed ${JSON.stringify(rejected)}`);
          }
        });
    });
  });
}

function asyncTask() {
  const value = Math.floor(Math.random() * 10);
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (value < 7) {
        rej();
      } else {
        res(`resolved with delay ${value * 1000}ms`);
      }
    }, value * 1000);
  });
}

resolvePromiseWithPriority([
  { status: asyncTask(), priority: 1 },
  { status: asyncTask(), priority: 4 },
  { status: asyncTask(), priority: 3 },
  { status: asyncTask(), priority: 2 },
])
  .then((val) => console.log("val", val))
  .catch((err) => console.log("err", err));
