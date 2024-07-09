function filterArray(arr, func) {
  let count = 0;
  for (let item of arr) {
    if (Array.isArray(item)) {
      count = count + filterArray(item, func);
    } else {
      if (func(item)) {
        count++;
      }
    }
  }

  return count;
}

const filterFunc = (item) => typeof item === "number";

let multiArray = [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]];

console.log(filterArray(multiArray, filterFunc));
