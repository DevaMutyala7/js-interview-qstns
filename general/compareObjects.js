function compareTwoObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function compareObjectsRecursion(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    let val1 = obj1[key];
    let val2 = obj2[key];

    let areObjects =
      val1 && typeof val1 === "object" && val2 && typeof val2 === "object";

    if (areObjects) {
      if (!compareObjectsRecursion(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
}

let obj1 = { a: 1, c: { d: [1, 2] }, b: 2 };
let obj2 = { b: 2, a: 1, c: { d: [2, 1] } };

console.log(compareObjectsRecursion(obj1, obj2));
