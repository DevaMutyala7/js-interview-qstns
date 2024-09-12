function getkey(key, obj) {
  if (Object.keys(obj).includes(obj[key])) {
    return getkey(obj[key], obj) + "->" + obj[key];
  } else {
    return obj[key];
  }
}

function convert(obj) {
  return Object.keys(obj).map((key) => {
    return getkey(key, obj) + "->" + key;
  });
}

function ancestoryTree(arr) {
  let obj = arr.reduce((acc, curr) => {
    let [child, parent] = curr;

    acc[child] = parent;

    return acc;
  }, {});

  return convert(obj);
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
