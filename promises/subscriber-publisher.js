class Event {
  constructor() {
    this.subscribeOnceCb = {};
    this.subscribeCb = {};
    this.subscribeOnceAsyncCb = {};
  }

  subscribe(name, callback) {
    if (this.subscribeCb[name]) {
      this.subscribeCb[name] = [...this.subscribeCb[name], callback];
    } else {
      this.subscribeCb[name] = [callback];
    }

    return () => {
      this.subscribeCb[name] = this.subscribeCb[name].filter(
        (cb) => cb !== callback
      );
    };
  }

  subscribeOnce(name, callback) {
    if (this.subscribeOnceCb[name]) {
      this.subscribeOnceCb[name] = [...this.subscribeOnceCb[name], callback];
    } else {
      this.subscribeOnceCb[name] = [callback];
    }
  }

  subscribeOnceAsync(name) {
    return new Promise((res, rej) => {
      if (this.subscribeOnceAsyncCb[name]) {
        this.subscribeOnceAsyncCb[name] = [
          ...this.subscribeOnceAsyncCb[name],
          res,
        ];
      } else {
        this.subscribeOnceAsyncCb[name] = [res];
      }
    });
  }

  publish(name, data) {
    //subscribe
    if (this.subscribeCb[name]) {
      this.subscribeCb[name].forEach((cb) => {
        cb.call(this, data);
      });
    }

    //subscribeOnce
    if (this.subscribeOnceCb[name]) {
      this.subscribeOnceCb[name].forEach((cb) => {
        cb.call(this, data);
      });

      this.subscribeOnceCb[name] = [];
    }

    //subscribeOnceAsync
    if (this.subscribeOnceAsyncCb[name]) {
      this.subscribeOnceAsyncCb[name].forEach((res) => {
        res(data);
      });
      this.subscribeOnceAsyncCb = [];
    }
  }

  publishAll(data) {
    Object.keys(this.subscribeCb).forEach((key) => {
      this.subscribeCb[key].forEach((cb) => {
        cb.call(this, data);
      });
    });

    Object.keys(this.subscribeOnceCb).forEach((key) => {
      this.subscribeOnceCb[key].forEach((cb) => {
        cb.call(this, data);
      });
    });
    this.subscribeOnceCb = [];

    Object.keys(this.subscribeOnceAsyncCb).forEach((key) => {
      this.subscribeOnceAsyncCb[key].forEach((cb) => {
        cb.call(this, data);
      });
    });
    this.subscribeOnceAsyncCb = [];
  }
}

const mazgine = new Event();

const unsubscribeTOI = mazgine.subscribe("TOI", function (payload) {
  console.log("send TOI to " + payload);
});

const unsubscribeakshi = mazgine.subscribe("Sakshi", function (payload) {
  console.log("send Sakshi to " + payload);
});

mazgine.subscribeOnce("Deccan", function (payload) {
  console.log("This is one time subscription to " + payload);
});

mazgine.subscribeOnceAsync("async").then((val) => {
  console.log("this is subscription in future for " + val);
});

mazgine.publishAll("Deva");
