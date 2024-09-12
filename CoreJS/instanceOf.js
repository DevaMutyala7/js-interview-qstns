function instanceOf(obj, target) {
  let proto = obj.__proto__;

  while (proto) {
    if (target.prototype === proto) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

class Vehicle {
  constructor() {
    this.horn = "pow pow";
  }
}

class Car {
  constructor() {
    // super();
    this.wheels = 4;
  }
}

const benz = new Car();
console.log(instanceOf(benz, Vehicle));
