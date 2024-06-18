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
    return this.front - this.end;
  }
}

const q1 = new Queue();

q1.enqueue(10);
q1.enqueue(20);
q1.enqueue(30);
q1.enqueue(40);

console.log("front", q1.front());
console.log("rear", q1.rear());
console.log("dequeu", q1.dequeue());
console.log("front", q1.front());
console.log("rear", q1.rear());
console.log("dequeu", q1.dequeue());
console.log("dequeu", q1.dequeue());
console.log("dequeu", q1.dequeue());
