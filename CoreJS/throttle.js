function throttle(func, limit) {
  let timer = null;

  return () => {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        clearTimeout(timer);
        timer = null;
      }, limit);
    }
  };
}
