/*--------recursive-------------*/
// async function asyncExecutor(promises) {

//   let p = promises.shift();

//   p.then((val) => {
//     console.log(val);
//     if (promises.length > 0) {
//       asyncExecutor(promises);
//     }
//   });
// }

/*-----------for loop-----------*/
async function asyncExecutor(promises) {
  for (let promise of promises) {
    let res = await promise.then((val) => val);
    console.log(res);
  }
}

/*----------reduce----------*/
// function asyncExecutor(promises) {
//   promises.reduce((accum, curr) => {
//     curr.then((val) => console.log(val));
//     // return accum;
//   }, []);
// }

function async(i) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(i);
    }, 1000 * i);
  });
}

let async1 = async(1);
let async2 = async(2);
let async3 = async(3);

asyncExecutor([async3, async2, async1]);
