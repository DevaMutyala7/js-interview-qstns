function sum(...args) {
  let storage = [...args];

  function res(...args) {
    storage.push(...args);
    return res;
  }

  res.valueOf = () => {
    return storage.reduce((a, b) => a + b, 0);
  };

  res.value = res.valueOf;

  return res;
}

let res1 = sum(1)(3).value();
let res2 = sum(2)(3) + 7;

console.log(res1);
console.log(res2);
