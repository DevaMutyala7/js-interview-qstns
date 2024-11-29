function isBinaryTreeFull(node) {
  if ((!node.left && node.right) || (!node.right && node.left)) {
    return false;
  }

  if (node.left && node.right) {
    return isBinaryTreeFull(node.left) && isBinaryTreeFull(node.right);
  }

  return true;
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
tree.left.left = new Node(40);

console.log(isBinaryTreeFull(tree));
