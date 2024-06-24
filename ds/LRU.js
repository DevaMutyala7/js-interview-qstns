class Node {
  constructor(val) {
    this.elem = val;
    this.next = null;
    this.prev = null;
  }
}

class Dll {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  findNode(node) {
    let nodeToBeSearched = this.head;
    while (nodeToBeSearched !== node) {
      nodeToBeSearched = nodeToBeSearched.next;
    }

    return nodeToBeSearched;
  }

  insertAtEnd(elem) {
    let node = new Node(elem);
    if (!this.size) {
      this.head = node;
      this.tail = node;
    } else {
      let oldTail = this.tail;
      this.tail.next = node;
      this.tail = node;
      this.tail.prev = oldTail;
    }
    this.size++;
    return node;
  }

  insertAtStart(val) {
    let newNode = new Node(val);
    let prevNode = this.head;
    newNode.next = prevNode;
    prevNode.prev = newNode;
    this.head = newNode;
    this.size++;
  }

  deleteAtStart() {
    let node = this.head;
    this.head = node.next;
    this.head.prev = null;
    this.size--;
    return node;
  }

  deleteAtEnd() {
    let before = this.tail.prev;
    this.tail = before;
    this.tail.next = null;
    this.size--;
    return before;
  }

  deleteNode(node) {
    let nodeToBeDeleted = this.findNode(node);

    if (nodeToBeDeleted === this.head) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (nodeToBeDeleted === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let prev = nodeToBeDeleted.prev;
      let next = nodeToBeDeleted.next;
      prev.next = next;
      next.prev = prev;
    }

    return nodeToBeDeleted;
  }

  size() {
    return this.size;
  }

  listAll() {
    let node = this.head;
    let arr = [];
    while (node) {
      arr.push(node.elem);
      node = node.next;
    }

    console.log(arr);
  }
}

class LRU {
  constructor(size) {
    this.size = size;
    this.dll = new Dll();
    this.hashMap = new Map();
  }

  put(key, val) {
    if (this.hashMap.size >= this.size) {
      let deletedLRU = this.deleteLRU();
      this.hashMap.delete(deletedLRU.elem.key);
    }
    let nodeAddress = this.dll.insertAtEnd({ key, value: val });
    this.hashMap.set(key, nodeAddress);
  }

  deleteLRU() {
    return this.dll.deleteAtStart();
  }

  get(key) {
    let item = this.hashMap.get(key).elem.value;
    if (this.hashMap.get(key)) {
      this.use(key, this.hashMap.get(key));
      return item;
    }
    return -1;
  }

  use(key, node) {
    let deleted = this.dll.deleteNode(node);
    let inserted = this.dll.insertAtEnd({
      key: key,
      value: deleted.elem.value,
    });
    this.hashMap.set(key, inserted);
  }

  display() {
    this.dll.listAll();
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
