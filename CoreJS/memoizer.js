function memoize(func) {
  let cache = {};

  return function (input) {
    if (cache[input]) {
      console.log("from cache");
      return cache[input];
    }
    let val = func(input);
    cache[input] = val;
    return val;
  };
}

const factorial = (n) => {
  if (n == 0 || n == 1) return 1;

  return n * factorial(n - 1);
};
const memoized = memoize(factorial);

console.log(memoized(100));
console.log(memoized(100));
