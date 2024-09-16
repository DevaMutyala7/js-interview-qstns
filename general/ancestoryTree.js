function ancestoryTree(arr) {
  const obj = convertToObj(arr);

  return Object.keys(obj).map((key) => recursive(key, obj));
}

function convertToObj(arr) {
  let obj = {};
  arr.forEach((item) => {
    obj[item[0]] = item[1];
  });

  return obj;
}

function recursive(key, obj) {
  if (!obj[key]) {
    return key;
  } else {
    return recursive(obj[key], obj) + "->" + key;
  }
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
