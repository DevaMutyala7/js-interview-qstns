async function retry(asyncFn, retries, delay, finalError) {
  return new Promise((resolve, reject) => {
    if (retries === 0) {
      reject(finalError);
      return;
    }
    console.log(`attempted ${retries} after ${delay} secs`);
    asyncFn()
      .then((val) => {
        console.log(val);
      })
      .catch((val) => {
        console.log(val);
        setTimeout(() => {
          retry(asyncFn, --retries, delay, finalError);
        }, delay);
      });
  }).catch((err) => {
    console.log(err);
  });
}

function asyncTask() {
  let counter = 0;

  return async function () {
    counter++;

    if (counter <= 5) {
      throw new Error("not Yet");
    }
    return "yahoo";
  };
}

retry(asyncTask(), 7, 2000, "FAILED");
