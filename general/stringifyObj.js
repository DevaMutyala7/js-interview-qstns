function stringifyobj(obj) {
  let newObj = {};
  for (let key in obj) {
    let newKey = key.toString();
    if (typeof obj[key] === "object") {
      newObj[`${newKey}`] = stringifyobj(obj[key]);
    } else {
      newObj[`${newKey}`] = obj[key].toString();
    }
  }

  return newObj;
}

let obj = {
  a: {
    b: {
      c: 1,
    },
  },
};

console.log(stringifyobj(obj));

console.log("stringify", JSON.stringify(obj));
