Array.prototype.listeners = {};

Array.prototype.addListener = function (type, callback) {
  if (!this.listeners[type]) {
    this.listeners[type] = [];
  }

  this.listeners[type].push(callback);
};

Array.prototype.pushWithEvents = function (type, items) {
  this.push(...items);

  this.triggerEvents(type, items);
};

Array.prototype.popWithEvents = function (type) {
  let poppedItem = this.pop();

  this.triggerEvents(type, poppedItem);
};

Array.prototype.triggerEvents = function (type, args) {
  this.listeners[type].forEach((listner) => {
    listner.call(this, args);
  });
};

Array.prototype.removeListener = function (type, callback) {
  this.listeners[type] = this.listeners[type].filter(
    (listner) => listner !== callback
  );
};

const arr = [];

function add(items) {
  console.log("Items were added", items);
}

function addAgain(items) {
  console.log("Items were added again", items);
}

function removed(items) {
  console.log(items + " removed");
}

arr.addListener("add", add);
arr.addListener("add", addAgain);
arr.addListener("remove", removed);

arr.pushWithEvents("add", [2, 3]);

arr.popWithEvents("remove", 3);

arr.removeListener("add", add);

arr.pushWithEvents("add", [3]);
