//class-based
class Streams {
  constructor() {
    this.subscriptionList = [];
  }

  subscribe(func) {
    if (typeof func !== "function") {
      throw new Error("not a function");
    }

    this.subscriptionList.push(func);
  }

  push(val) {
    this.subscriptionList.forEach((subscription) => {
      subscription.call(this, val);
    });
  }
}

const stream = new Streams();
stream.subscribe((val) => console.log(val));
stream.subscribe((val) => console.log(val * 2));
stream.subscribe((val) => console.log(val * 4));

stream.push(2);

//Function based
function StreamsFunc() {
  let subscriptions = [];

  this.subscribe = (func) => {
    if (typeof func !== "function") {
      throw new Error("Not a function");
    }
    subscriptions.push(func);
  };

  this.push = (val) => {
    subscriptions.forEach((sub) => {
      sub.call(this, val);
    });
  };
}

const z = new StreamsFunc();
z.subscribe((val) => console.log(val * 100));
z.subscribe((val) => console.log(val * 200));
z.subscribe((val) => console.log(val * 300));

z.push(1);
