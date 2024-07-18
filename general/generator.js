function generator(values) {
  let i = -1;

  function next() {
    return values[++i] || null;
  }

  function done() {
    return i >= values.length - 1;
  }

  return {
    next,
    done,
  };
}

const iterator = generator([1, 2, "hi"]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.done());
console.log(iterator.next());
console.log(iterator.done());
console.log(iterator.next());
