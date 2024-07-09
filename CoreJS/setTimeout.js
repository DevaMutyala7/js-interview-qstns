function MySetTimeout(func, delay) {
  let now = Date.now();
  let later = now + delay;

  func.call(this);
}

MySetTimeout(() => {
  console.log("after 3 secs");
}, 3000);
