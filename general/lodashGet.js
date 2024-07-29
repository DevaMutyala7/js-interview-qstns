function lodashGet(obj, path) {
  if (!path || !path.length) {
    return obj;
  }

  let keys;

  if (typeof path === "string") {
    path = path.replace(/[^a-zA-Z0-9\s]/g, "");
    keys = path.split("");
  } else {
    keys = path;
  }

  for (let key of keys) {
    if (obj[key]) {
      return lodashGet(obj[key], keys.slice(1));
    }
    return undefined;
  }
}

let obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(lodashGet(obj, "a.b.c[1]"));
