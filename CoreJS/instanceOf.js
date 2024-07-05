function instanceOf(obj, target) {
  let proto = obj.__proto__;
  console.log("proto", target.prototype);
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

class Car extends Vehicle {
  constructor() {
    super();
    this.wheels = 4;
  }
}

const benz = new Car();
console.log(benz.__proto__);
