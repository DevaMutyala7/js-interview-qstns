function sampling(msg, count) {
  let counter = 0;

  return function (...args) {
    counter++;
    if (counter % count === 0) {
      msg(args[0]);
    }
  };
}

let message = (msg) => {
  console.log(msg);
};

let sampler = sampling(message, 2);

sampler(1);
sampler(2);
sampler(3);
sampler(4);
sampler(5);
sampler(6);
