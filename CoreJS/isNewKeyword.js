function A() {
  if (this instanceof A && !this._constructed) {
    console.log("called with new");
    this._constructed = true;
  } else {
    console.log("called normally");
  }

  //can use new.target
  //   if (new.target) {
  //     console.log("called with new");
  //   } else {
  //     console.log("called normally");
  //   }
}

A();

function myNew(constructor) {
  let obj = { sample: "hi" };
  Object.setPrototypeOf(obj, constructor.prototype);
  constructor.apply(obj);
  return obj;
}

let obj = myNew(A);
obj.lol = A;
obj.lol();
