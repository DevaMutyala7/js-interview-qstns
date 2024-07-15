function debounce(func, delay, immediate) {
  let timer = null;

  return () => {
    const args = arguments;
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!immediate) {
        console.log("in timer");
        func.apply(context, args);
      }

      timer = null;
    }, delay);

    if (callNow) {
      console.log("in callNow");
      func.apply(context, args);
    }
  };
}

let debounced = debounce(
  () => {
    console.log("hii");
  },
  1000,
  true
);

debounced();
debounced();
debounced();
