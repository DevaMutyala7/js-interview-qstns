class Stack {
  constructor(size) {
    this.arr = new Array(size);
    this.top1 = -1;
    this.top2 = size;
  }

  push1(val) {
    if (this.top1 < this.top2) {
      this.arr[++this.top1] = val;
    }
  }

  push2(val) {
    if (this.top1 < this.top2) {
      this.arr[--this.top2] = val;
    }
  }

  pop1() {
    return this.arr[this.top1--];
  }

  pop2() {
    return this.arr[this.top2++];
  }

  peek1() {
    return this.arr[this.top1];
  }

  peek2() {
    return this.arr[this.top2];
  }

  isEmpty1() {
    return this.top1 === -1;
  }

  isEmpty2() {
    return this.top2 === size;
  }

  size1() {
    return this.top1;
  }

  size2() {
    return this.arr.length - this.top2;
  }
}

const stack = new Stack(6);

stack.push1(10);
stack.push1(20);
stack.push2(60);
stack.push2(50);

console.log("peek stack1...", stack.peek1());
console.log("peek stack2...", stack.peek2());
console.log("---------------");
stack.push2(40);
stack.push2(30);
console.log("---------------");
console.log("peek stack2...", stack.peek2());
console.log("---------------");
console.log("peek stack2...", stack.pop2());
console.log("---------------");
console.log("peek stack2...", stack.pop2());
