function piping(obj) {
  let res = {};
  return function (a, b, c) {
    for (let key in obj) {
      if (typeof obj[key] === "function") {
        res[key] = obj[key](a, b, c);
      } else if (typeof obj[key] === "object") {
        res[key] = { ...res, ...piping(obj[key])(a, b, c) };
      } else {
        res[key] = obj[key];
      }
    }
    return res;
  };
}

let obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
  e: true,
  f: 1,
};

console.log(piping(obj)(1, 1, 1));
