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
