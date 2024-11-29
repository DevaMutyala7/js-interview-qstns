class Level {
  constructor(node, num, level) {
    this.node = node;
    this.num = num;
    this.level = level;
  }
}

function widthOfBinaryTree(node) {
  let queue = [];
  let currentLevel = 0;
  let firstNumInLevel = 1;
  let maxWidth = 0;
  let levelNode = new Level(node, 1, 0);

  queue.push(levelNode);

  while (queue.length !== 0) {
    let element = queue.shift();
    if (currentLevel !== element.level) {
      currentLevel = element.level;
      firstNumInLevel = element.num;
    } else {
      maxWidth = Math.max(maxWidth, element.num - firstNumInLevel);
    }
    if (element.node.left) {
      let newNode = new Level(
        element.node.left,
        element.num * 2,
        element.level + 1
      );
      queue.push(newNode);
    }
    if (element.node.right) {
      let newNode = new Level(
        element.node.right,
        2 * element.num + 1,
        element.level + 1
      );
      queue.push(newNode);
    }
  }

  return maxWidth + 1;
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let tree = new Node(10);
tree.left = new Node(20);
tree.right = new Node(30);
tree.left.right = new Node(40);
tree.left.left = new Node(50);
tree.right.right = new Node(70);
tree.right.left = new Node(60);
tree.left.left.left = new Node(80);
tree.right.right.left = new Node(90);

console.log(widthOfBinaryTree(tree));

//              10

//         20         30

//     50     40    60    70

// 80                  90
