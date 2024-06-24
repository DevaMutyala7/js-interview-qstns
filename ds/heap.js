class MaxHeap {
  constructor() {
    this.arr = [];
    this.current = 0;
  }

  insert(val) {
    this.arr[this.current] = val;
    this.upHeapify();
    this.current = this.arr.length;
  }

  delete() {
    let deleted = this.arr[0];
    this.swap(0, this.current - 1);
    this.arr.pop();
    this.downHeapify(this.arr, 0, this.arr.length);
    this.current = this.arr.length;

    return deleted;
  }

  upHeapify() {
    while (
      this.current - 1 >= 0 &&
      this.arr[this.current] > this.arr[Math.floor((this.current - 1) / 2)]
    ) {
      this.swap(Math.floor((this.current - 1) / 2), this.current);
      this.current = Math.floor((this.current - 1) / 2);
    }
  }

  downHeapify(arr, parent, size) {
    let leftChild = parent * 2 + 1;
    let rightChild = parent * 2 + 2;
    let largest = parent;

    if (leftChild < size && arr[leftChild] > arr[largest]) {
      largest = leftChild;
    }
    if (rightChild < size && arr[rightChild] > arr[largest]) {
      largest = rightChild;
    }
    if (parent != largest) {
      this.swap(parent, largest);
      this.downHeapify(arr, largest, size);
    }
  }

  swap(first, second) {
    let temp = this.arr[first];
    this.arr[first] = this.arr[second];
    this.arr[second] = temp;
  }

  peek() {
    return this.arr;
  }
}

const max_heap = new MaxHeap();

max_heap.insert(50);
max_heap.insert(16);
max_heap.insert(8);
max_heap.insert(30);
max_heap.insert(20);
max_heap.insert(15);
max_heap.insert(10);

console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
console.log("--------------------");
console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
console.log("--------------------");
console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
console.log("--------------------");
console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
console.log("--------------------");
console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
console.log("--------------------");
console.log("deleted", max_heap.delete());
console.log(max_heap.peek());
