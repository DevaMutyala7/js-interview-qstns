class Stack {
  constructor(size, stacks) {
    this.arr = new Array(size);
    this.top = new Array(stacks);
    this.next = new Array(size);
    this.free = 0;

    this.top.fill(-1);

    for (let i = 0; i < size - 1; i++) {
      this.next[i] = i + 1;
    }
    this.next[size - 1] = -1;
  }

  push(val, stack) {
    let current = this.free;

    this.arr[this.free] = val;
    this.free = this.next[current];
    this.next[current] = this.top[stack - 1];
    this.top[stack - 1] = current;
  }

  pop(stack) {
    let i = this.top[stack - 1];

    this.top[stack - 1] = this.next[i];

    this.next[i] = this.free;
    this.free = i;

    return this.arr[i];
  }

  peek(stack) {
    return this.arr[this.top[stack - 1]];
  }

  isEmpty(stack) {
    return this.top[stack - 1] === -1;
  }

  size(stack) {
    let size = 0;
    let current = this.top[stack - 1];
    while (current !== -1) {
      size++;
      current = this.next[current];
    }

    return size;
  }
}

let stack = new Stack(10, 3);
stack.push(10, 1);
stack.push(20, 1);
stack.push(30, 2);
stack.push(40, 3);
stack.push(50, 2);
stack.push(60, 1);
stack.push(70, 3);

console.log("peek stack1", stack.peek(1));
console.log("peek stack2", stack.peek(2));
console.log("peek stack3", stack.peek(3));
console.log("----------------------");
console.log("pop stack 3", stack.pop(3));
console.log("peek stack3", stack.peek(3));
console.log("----------------------");
console.log("pop stack 3", stack.pop(3));
console.log("peek stack3", stack.peek(3));
console.log("----------------------");
stack.push(70, 1);
console.log("peek stack1", stack.peek(1));
console.log("----------------------");
console.log("pop stack 1", stack.pop(1));
console.log("peek stack1", stack.peek(1));
console.log("----------------------");
console.log("peek stack1", stack.peek(1));
console.log("peek stack2", stack.peek(2));
console.log("peek stack3", stack.peek(3));
