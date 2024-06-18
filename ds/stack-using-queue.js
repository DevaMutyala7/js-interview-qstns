class Queue {
  constructor() {
    this.arr = [];
    this.top = 0;
    this.end = 0;
  }

  enqueue(val) {
    this.arr[this.top++] = val;
  }

  dequeue() {
    return this.arr[this.end++];
  }

  front() {
    return this.arr[this.end];
  }

  rear() {
    return this.arr[this.top - 1];
  }

  isEmpty() {
    return this.end > this.top;
  }

  size() {
    return this.top - this.end;
  }

  toArray() {
    return this.arr.slice(this.end);
  }
}

class Stack {
  constructor() {
    this.queue = new Queue();
  }

  push(val) {
    this.queue.enqueue(val);
  }

  pop() {
    let size = 1;
    while (size < this.queue.size()) {
      this.queue.enqueue(this.queue.dequeue());
      size++;
    }

    return this.queue.dequeue();
  }

  peek() {
    return this.queue.rear();
  }

  isEmpty() {
    return this.queue.isEmpty();
  }

  size() {
    return this.queue.size();
  }

  toArray() {
    return this.queue.toArray();
  }
}

const stack1 = new Stack();

stack1.push(10);
stack1.push(20);
stack1.push(30);
stack1.push(40);

console.log("stack", stack1.toArray());
console.log("peek", stack1.peek());
console.log("pop", stack1.pop());
console.log("-------------------");
console.log("stack", stack1.toArray());
console.log("peek", stack1.peek());
console.log("pop", stack1.pop());
console.log("-------------------");
stack1.push(50);
stack1.push(60);
console.log("stack", stack1.toArray());
console.log("peek", stack1.peek());
console.log("pop", stack1.pop());
