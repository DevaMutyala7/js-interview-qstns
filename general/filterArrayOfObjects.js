function filterObject(arr, value) {
  return arr.filter((item, index) => {
    if (typeof value === "number") {
      return index !== value && item;
    } else {
      let filtered = false;
      for (let key in item) {
        if (item[key].toString() === value) {
          filtered = true;
        }
      }
      return !filtered && item;
    }
  });
}

let arr = [
  { name: "Deva", id: 1 },
  { name: "Deva", id: 3 },
  { name: "Teja", id: 2 },
  { name: "Mutyala", id: 4 },
];

console.log(filterObject(arr, "Deva"));
