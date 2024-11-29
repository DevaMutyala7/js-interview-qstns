function heightOfBinaryTree(node) {
  if (!node) return 0;

  if (!node.left && !node.right) {
    return 1;
  }

  let current = 1;

  current += Math.max(
    heightOfBinaryTree(node.left),
    heightOfBinaryTree(node.right)
  );

  return current;
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

console.log(heightOfBinaryTree(tree));
