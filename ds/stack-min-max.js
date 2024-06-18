class Stack {
  constructor() {
    this.arr = [];
    this.top = 0;
  }

  push(val) {
    this.arr[this.top++] = val;
  }

  pop() {
    if (this.arr.length) {
      return this.arr[--this.top];
    }
  }

  peek() {
    return this.arr[this.top - 1];
  }

  isEmpty() {
    return this.top === 0;
  }

  clear() {
    this.arr = [];
    this.top = 0;
  }

  size() {
    return this.top;
  }
}

class StackWithMinMax {
  constructor() {
    this.stack1 = new Stack();
    this.min_stack = new Stack();
    this.max_stack = new Stack();
  }

  push(val) {
    this.stack1.push(val);

    let topElem = this.min_stack.peek();
    let min_val = topElem ? (val > topElem ? topElem : val) : val;
    this.min_stack.push(min_val);

    let topElemMaxStack = this.max_stack.peek();
    let max_val = topElemMaxStack
      ? val > topElemMaxStack
        ? val
        : topElemMaxStack
      : val;
    this.max_stack.push(max_val);
  }

  pop() {
    this.min_stack.pop();
    this.max_stack.pop();
    return this.stack1.pop();
  }

  peek() {
    return this.stack1.peek();
  }

  isEmpty() {
    return this.stack1.isEmpty();
  }

  size() {
    return this.stack1.size();
  }

  min() {
    return this.min_stack.peek();
  }

  max() {
    return this.max_stack.peek();
  }
}

const stack = new StackWithMinMax();
stack.push(2);
stack.push(5);
stack.push(17);
stack.push(23);
stack.push(88);
stack.push(54);
stack.push(1);
stack.push(22);
console.log("max", stack.max());
console.log("min", stack.min());
console.log("-----------------");
console.log("pop", stack.pop());
console.log("max", stack.max());
console.log("min", stack.min());
console.log("-----------------");
console.log("pop", stack.pop());
console.log("max", stack.max());
console.log("min", stack.min());
console.log("-----------------");
console.log("pop", stack.pop());
console.log("max", stack.max());
console.log("min", stack.min());
