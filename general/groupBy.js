function groupBy(values, keyFinder) {
  let obj = {};

  const getKey = (value) => {
    if (typeof keyFinder === "string") {
      return value[keyFinder];
    } else {
      return keyFinder(value);
    }
  };

  values.forEach((value) => {
    const key = getKey(value);
    if (obj[key]) {
      obj[key] = [...obj[key], value];
    } else {
      obj[key] = [value];
    }
  });

  return obj;
}

console.log(groupBy(["one", "two", "three"], "length"));
console.log(groupBy([6.1, 6.2, 6.5, 4.3], Math.floor));
