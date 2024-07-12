function deepFlatten(obj, key) {
  let res = {};
  for (let item in obj) {
    let thisKey = `${key ? key + "." : ""}${item}`;
    if (typeof obj[item] === "object") {
      res = { ...res, ...deepFlatten(obj[item], thisKey) };
    } else {
      res[thisKey] = obj[item];
    }
  }
  return res;
}

let input = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(deepFlatten(input));
