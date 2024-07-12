function toggle(...args) {
  let i = -1;

  return function () {
    i++;
    console.log(args[i % args.length]);
  };
}

let invoke = toggle("deva", "teja", "mutyala");
invoke();
invoke();
invoke();
invoke();
invoke();
invoke();
invoke();
