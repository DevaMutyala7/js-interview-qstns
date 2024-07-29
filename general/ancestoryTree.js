function getKey(obj, key) {
  if (obj[key] in obj) {
    return getKey(obj, obj[key]) + "->" + key;
  } else {
    return obj[key] + "->" + key;
  }
}

function convert(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    acc.push(getKey(obj, curr));
    return acc;
  }, []);
}

function ancestoryTree(arr) {
  let aggregated = arr.reduce((acc, curr) => {
    let [child, parent] = curr;
    acc[child] = parent;

    return acc;
  }, {});

  return convert(aggregated);
}

let arr = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

console.log(ancestoryTree(arr));
