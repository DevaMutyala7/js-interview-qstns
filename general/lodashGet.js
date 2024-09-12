function lodashGet(obj, path) {
  let keys = path.replace(/[^a-zA-Z0-9\s]/g, "");
  keys = keys.split("");

  let res = obj;
  for (let key of keys) {
    res = res[key];
  }

  return res;
}

let obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(lodashGet(obj, "a"));
