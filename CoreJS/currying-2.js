function curry() {
  let prev = 0;

  return function (val) {
    prev += val;
    return prev;
  };
}

let sum = curry();
let res1 = sum(1); //1
let res2 = sum(2); //3
let res3 = sum(3); //5

console.log(res1, res2, res3);
