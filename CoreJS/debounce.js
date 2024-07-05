function debounce(func, delay, immediate) {
  let timer = null;

  return () => {
    const args = arguments;
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!callNow) {
        func.apply(context, args);
      }

      timer = null;
    }, delay);

    if (!callNow) {
      func.apply(context, args);
    }
  };
}
