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

class Queue {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  enqueue(val) {
    this.stack1.push(val);
  }

  dequeue() {
    if (!this.stack2.isEmpty()) {
      return this.stack2.pop();
    }
    while (!this.stack1.isEmpty()) {
      this.stack2.push(this.stack1.pop());
    }

    return this.stack2.pop();
  }

  front() {
    if (this.stack1.isEmpty() && this.stack2.isEmpty()) {
      return undefined;
    }

    while (!this.stack1.isEmpty()) {
      this.stack2.push(this.stack1.pop());
    }

    return this.stack2.peek();
  }

  size() {
    return this.stack1.size() + this.stack2.size();
  }

  isEmpty() {
    return !this.stack1.size() && !this.stack2.size();
  }
}

const q1 = new Queue();

q1.enqueue(10);
q1.enqueue(20);
q1.enqueue(30);

console.log("front", q1.front());

console.log("dequeu", q1.dequeue());

console.log("front", q1.front());

q1.enqueue(40);

console.log("front", q1.front());
