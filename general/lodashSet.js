function helper(obj, path, value) {
  let [current, ...rest] = path;

  if (rest.length) {
    if (obj[current]) {
      return helper(obj[current], rest, value);
    } else {
      const isNumber = `${+rest[0]}` === rest[0];
      if (isNumber) {
        obj[current] = [];
      } else {
        obj[current] = {};
      }
      return helper(obj[current], rest, value);
    }
  } else {
    obj[current] = value;
  }
}

function lodashSet(obj, path, value) {
  if (typeof path === "string") {
    path = path.replace(/[^a-zA-Z0-9\s]/g, "").split("");
  }

  helper(obj, path, value);
}

let obj = { a: [{ b: { c: 3 } }] };

lodashSet(obj, ["x", "0", "y", "z"], 4);

console.log(obj);
