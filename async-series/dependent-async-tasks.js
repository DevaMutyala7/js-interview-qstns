class Task {
  constructor(tasks, cb) {
    this.filteredTasks = tasks ? tasks.filter((task) => !task.completed) : [];
    this.incompletedTasks = this.filteredTasks.length;
    this.callback = cb;
    this.handlers = [];
    this.executeCallback();
  }

  executeCallback() {
    if (!this.incompletedTasks) {
      this.callback(this.done.bind(this));
    } else {
      for (let task of this.filteredTasks) {
        task.handlers.push(this);
      }
    }
  }

  executeHandlers() {
    for (let handler of this.handlers) {
      handler.incompletedTasks--;
      if (!handler.incompletedTasks) {
        handler.callback(this.done.bind(handler));
      }
    }
  }

  done() {
    this.completed = true;
    this.executeHandlers();
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
  }, 5000);
});

const TaskD = new Task([TaskC], (done) => {
  setTimeout(() => {
    console.log("Task D completed");
    done();
  }, 1000);
});
