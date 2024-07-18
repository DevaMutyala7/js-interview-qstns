class EventEmmitter {
  constructor() {
    this.subscribers = {};
  }

  subscribe(name, func) {
    if (this.subscribers[name]) {
      this.subscribers[name] = [...this.subscribers[name], func];
    } else {
      this.subscribers[name] = [func];
    }

    return function unsubscribe() {
      this.subscribers[name] = this.subscribers[name].filter(
        (handler) => handler !== func
      );
    };
  }

  publish(name) {
    this.subscribers[name].forEach((handler) => {
      handler();
    });
  }
}

let em1 = new EventEmmitter();
em1.subscribe("deva", () => {
  console.log("A");
});
em1.subscribe("deva", () => {
  console.log("B");
});

em1.publish("deva");
