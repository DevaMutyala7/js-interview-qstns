class SDK {
  constructor() {
    this.events = [];
    this.count = 1;
  }

  logEvent(event) {
    this.events.push(event);
  }

  await() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (this.count % 5 === 0) {
          rej();
        } else {
          res();
        }
      }, 1000);
    });
  }

  async sendAnalytics() {
    if (!this.events.length) return;

    let event = this.events.shift();

    try {
      await this.await();

      console.log("sent", event);

      this.count++;
    } catch (e) {
      console.log("=================");
      console.log("Failed to send", event);
      console.log("Retrying to send", event);
      console.log("=================");
      this.count = 1;
      this.events.unshift(event);
    } finally {
      this.sendAnalytics();
    }
  }

  send = async function () {
    this.sendAnalytics();
  };
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
