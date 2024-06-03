function retryPromises(asyncFun, retries, delay, finalError, count) {
  if (count > retries) {
    console.log(finalError);
    return;
  }

  asyncFun
    .then((val) => console.log(val))
    .catch(() => {
      if (count === 1) {
        console.log(`...attempt ${count} ---> failed`);
      } else {
        console.log(
          `...attempt ${count} ---> retry after ${delay}ms ----> failed`
        );
      }
      if (count <= retries) {
        setTimeout(() => {
          retryPromises(asyncFun, retries, delay, finalError, ++count);
        }, delay);
      }
    });
}

function asyncFunc() {
  return new Promise((res, rej) => {
    rej("rejected....");
  });
}

retryPromises(asyncFunc(), 3, 4000, "FAILED", 1);
