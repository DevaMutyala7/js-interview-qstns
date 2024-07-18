function mergeObjects(...arguments) {
  let newObj = {};
  let deepMerge = false;
  let i = 0;

  if (typeof arguments[0] === "boolean") {
    deepMerge = arguments[0];
    i++;
  }

  const merge = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (deepMerge && typeof obj[key] === "object") {
          newObj[key] = mergeObjects(deepMerge, newObj[key], obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  };

  for (; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return newObj;
}

let obj1 = {
  name: "Deva",
  age: 20,
  marks: {
    maths: 9,
    sience: 9,
    social: 9,
  },
};

let obj2 = {
  school: "D.A.V",
  address: "Anakapalli",
  marks: {
    telugu: 10,
    english: 9,
    hindi: 9,
  },
};

console.log(mergeObjects(obj1, obj2));
