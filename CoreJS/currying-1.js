function sum(...args) {
  let storage = [...args];

  if (!storage.length) {
    return 0;
  }

  return function curryingSum(...args) {
    storage.push(...args);

    if (!args.length) {
      return storage.reduce((a, b) => a + b, 0);
    }
    return curryingSum;
  };
}

let res1 = sum(1)(2, 3, 5)();
let res2 = sum(1, 2)(3, 5)();
let res3 = sum(1, 2, 3)(5)();
let res4 = sum(1, 2, 3)(5)();
let res5 = sum(1, 2, 3, 5)();
let res6 = sum(1)(2)(3)(5)();
let res7 = sum();

console.log(res1, res2, res3, res4, res5, res6, res7);
