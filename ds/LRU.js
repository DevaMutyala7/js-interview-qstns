class Node {
  constructor(key, val) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

class LRU {
  head = new Node(0, 0);
  tail = new Node(0, 0);
  constructor(size) {
    this.size = size;
    this.head.next = this.tail;
    this.hashMap = new Map();
  }

  get(key) {
    if (this.hashMap.get(key)) {
      let node = this.hashMap.get(key);
      this.remove(node);
      this.insert(node);
      return node.val;
    }
    return -1;
  }

  put(key, val) {
    if (this.hashMap.get(key)) {
      this.remove(this.hashMap.get(key));
    }
    if (this.hashMap.size >= this.size) {
      this.remove(this.tail.prev);
    }
    let newNode = new Node(key, val);
    this.insert(newNode);
  }

  remove(node) {
    this.hashMap.delete(node.key);
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  insert(node) {
    this.hashMap.set(node.key, node);
    let next = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = next;
    next.prev = node;
  }

  display() {
    let res = [];
    let node = this.head;
    while (node) {
      res.push(node.val);
      node = node.next;
    }
    console.log(res);
  }
}

let lru = new LRU(3);
lru.put(1, 10);
lru.put(2, 20);
lru.put(3, 30);
lru.display();
console.log("-------------");
console.log("get", lru.get(1));
lru.display();
console.log("-------------");
lru.put(4, 40);
lru.display();
console.log("-------------");
lru.put(5, 50);
lru.display();
console.log("-------------");
lru.put(6, 60);
lru.display();
console.log("-------------");
console.log("get", lru.get(5));
lru.display();
