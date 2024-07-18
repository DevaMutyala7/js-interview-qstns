class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class History {
  constructor() {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.currentPage = this.head;

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  visit(url) {
    let visited = new Node(url);
    this.link(visited);
    this.currentPage = visited;
  }

  current() {
    return this.currentPage.val;
  }

  forward() {
    if (this.currentPage.next.val) {
      this.currentPage = this.currentPage.next;
      return this.currentPage.val;
    }
    return null;
  }

  backward() {
    if (this.currentPage.prev.val) {
      this.currentPage = this.currentPage.prev;
      return this.currentPage.val;
    }
    return null;
  }

  link(newNode) {
    this.currentPage.next = newNode;
    newNode.prev = this.currentPage;
    newNode.next = this.tail;
  }
}

const browser = new History();

browser.visit("google");
browser.visit("youtube");
browser.visit("white noise sound vedio");
console.log("current", browser.current());
console.log("forward", browser.forward());
console.log("backward", browser.backward());
console.log("current", browser.current());
console.log("backward", browser.backward());
console.log("current", browser.current());
console.log("backward", browser.backward());
console.log("current", browser.current());
