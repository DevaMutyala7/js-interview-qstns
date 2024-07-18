function groupBy(values, keyFinder) {
  return values.reduce((a, b) => {
    let key = typeof keyFinder === "function" ? keyFinder(b) : b[keyFinder];

    if (a[key]) {
      a[key] = [...a[key], b];
    } else {
      a[key] = [b];
    }

    return a;
  }, {});
}

console.log(groupBy(["one", "two", "three"], "length"));
console.log(groupBy([6.1, 6.2, 6.5, 4.3], Math.floor));
