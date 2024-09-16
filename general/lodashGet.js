function lodashGet(obj, path) {
  const newPath = path.replace(/[^a-zA-Z0-9]/g, "").split("");

  let result = { ...obj };

  newPath.forEach((key) => {
    result = result[key];
  });

  return result;
}

let obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(lodashGet(obj, "a.b.c[2]"));
