function helper(obj, path, value) {
  let key = path.shift();
  if (path.length > 0) {
    if (!obj[key]) {
      const isNumber = `${+path[0]}` === path[0];
      obj[key] = isNumber ? [] : {};
    }
    if (typeof obj[key] === "object") {
      helper(obj[key], path, value);
    } else {
      helper(isNumber ? [] : {}, path, value);
    }
  } else {
    obj[key] = value;
  }

  return obj;
}

function lodashSet(obj, path, value) {
  if (typeof path === "string") {
    path = path.replace(/[^a-zA-Z0-9\s]/g, "").split("");
  }

  helper(obj, path, value);
}

let obj = { a: [{ b: { c: 3 } }] };

lodashSet(obj, ["a", "0", "b", "d"], 4);

console.log(obj);
