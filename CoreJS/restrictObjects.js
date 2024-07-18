"use strict";
function deepSeal(obj) {
  Object.seal(obj);
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      deepSeal(obj[i]);
    }
  }
}

let obj = {
  name: "Deva",
  age: 20,
  career: {
    school: {
      name: "D.A.V",
      avg: 9.0,
      subjects: {
        maths: 9,
        sience: 9,
        social: 9,
      },
    },
  },
};

deepSeal(obj);

obj.career.school.address = "anakapalli"; //throws error in strict mode

function deepFreeze(obj) {
  Object.freeze(obj);
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      deepFreeze(obj[key]);
    }
  }
}

deepFreeze(obj);

obj.career.school.name = "Bashyam"; //throws error in strict mode

console.log(obj);
