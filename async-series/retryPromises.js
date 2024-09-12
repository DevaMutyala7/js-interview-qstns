function retryPromises(asyncFun, retries, delay, finalError) {
  asyncFun
    .then((val) => console.log(val))
    .catch(() => {
      console.log(`...attempt failed ---> retry after ${delay}ms ----> failed`);

      if (retries) {
        setTimeout(() => {
          retryPromises(asyncFun, --retries, delay, finalError);
        }, delay);
      }
    });
}

function asyncFunc() {
  return new Promise((res, rej) => {
    rej("rejected....");
  });
}

retryPromises(asyncFunc(), 3, 4000, "FAILED");
