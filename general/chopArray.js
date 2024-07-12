function chopArray(arr, length) {
  let result = [];
  let temp = [...arr];

  while (temp.length) {
    result.push(temp.splice(0, length));
  }

  return result;
}

console.log(chopArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 3));
