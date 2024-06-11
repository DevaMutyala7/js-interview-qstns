class Task {
  constructor(tasks, callback) {
    this.completed = false;
    this.tasks = tasks
      ? tasks.filter((task) => !task.completed && task instanceof Task)
      : [];
    this.totalDependecies = this.tasks.length;
    this.dependenciesList = [];
    this.callback = callback;
    this.executeCallback();
  }

  executeCallback() {
    if (this.tasks.length) {
      for (const task of this.tasks) {
        task.dependenciesList.push(this.track.bind(this));
      }
    } else {
      this.callback(this.done.bind(this));
    }
  }

  track() {
    this.totalDependecies--;
    if (this.totalDependecies === 0) {
      this.callback(this.done.bind(this));
    }
  }

  done() {
    this.completed = true;
    for (const cb of this.dependenciesList) {
      cb();
    }
  }
}

const TaskA = new Task(null, (done) => {
  setTimeout(() => {
    console.log("Task A completed");
    done();
  }, 1000);
});

const TaskB = new Task(null, (done) => {
  setTimeout(() => {
    console.log("Task B completed");
    done();
  }, 2000);
});

const TaskC = new Task([TaskA, TaskB], (done) => {
  setTimeout(() => {
    console.log("Task C completed");
    done();
  }, 500);
});
