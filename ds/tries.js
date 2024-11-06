class Node {
  constructor(char) {
    this.children = Array.from({ length: 26 }, () => null);
    this.eow = false;
    this.char = char;
  }
}

class Trie {
  constructor() {
    this.root = new Node(null);
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let idx = char.charCodeAt(0) - "a".charCodeAt(0);

      if (current.children[idx]) {
        current = current.children[idx];
        if (i === word.length - 1) {
          current.eow = true;
        }
      } else {
        let newNode = new Node(char);
        current.children[idx] = newNode;
        if (i === word.length - 1) {
          newNode.eow = true;
        }
        current = newNode;
      }
    }
  }

  search(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let idx = char.charCodeAt(0) - "a".charCodeAt(0);

      if (!current.children[idx] || current.children[idx].char !== char) {
        return false;
      } else if (i === word.length - 1 && !current.children[idx].eow) {
        return false;
      } else {
        current = current.children[idx];
      }
    }

    return true;
  }
}

const tree = new Trie();

tree.insert("apple");
tree.insert("battery");
tree.insert("bat");

console.log(tree.search("battery"));
