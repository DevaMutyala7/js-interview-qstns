function throttle(func, limit) {
  let timer = true;

  return () => {
    const context = this;
    const args = arguments;
    if (timer) {
      func.apply(context, args);
      timer = false;
      setTimeout(() => {
        timer = true;
      }, limit);
    }
  };
}
