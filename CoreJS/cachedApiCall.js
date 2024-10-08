function cachedApiCall(delay) {
  let cachedResult;
  let lastCalled;

  return async (...args) => {
    if (!lastCalled || Date.now() - lastCalled > delay) {
      console.log("not from the cache");
      cachedResult = await fetch(args[0]).then((res) => res.json());
    }

    lastCalled = Date.now();
    return cachedResult;
  };
}

const call = cachedApiCall(1500);

call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log(a)
);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 1800);
