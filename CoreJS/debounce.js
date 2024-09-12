function debounce(func, delay, immediate) {
  let timer = null;

  return function () {
    const args = arguments;
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);

    if (callNow) {
      func.apply(context, args);
    }

    timer = setTimeout(() => {
      if (!callNow) {
        console.log("not callnow");
        func.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}

const onMouse = (e) => {
  console.log(e.x);
};
const debouncedMouseMove = debounce(onMouse, 1000, true);
window.addEventListener("mousemove", debouncedMouseMove);
