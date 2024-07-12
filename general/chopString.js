function chopString(str, length) {
  let temp = str;
  let res = [];

  let i = 0;

  while (i < temp.length) {
    res.push(temp.slice(i, i + length));
    i = i + length;
  }

  return res;
}

console.log("chop", chopString("TheWhoWhy", 3));
