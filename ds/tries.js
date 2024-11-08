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

  remove(word) {
    let prevEow;
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let idx = char.charCodeAt(0) - "a".charCodeAt(0);

      if (current.children[idx]) {
        current = current.children[idx];
        if (i !== word.length - 1 && current.eow) {
          prevEow = current;
        }
      } else {
        return "no such word";
      }

      if (i === word.length - 1) {
        if (current.eow) {
          let nextElements = current.children.some((item) => item !== null);
          if (nextElements) {
            current.eow = false;
          } else {
            if (prevEow) {
              prevEow.children.fill(null);
            }
          }
        } else {
          return "No such word";
        }
      }
    }
    return "removed successfully";
  }

  getWords(prefix, current, word, char) {
    current.children.forEach((node) => {
      if (node) {
        let newChar = char + node.char;
        if (node.eow) {
          word.push(prefix + newChar);
        } else {
          this.getWords(prefix, node, word, newChar);
        }
      }
    });
  }

  find(prefix) {
    let words = [];
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let char = prefix.charAt(i);
      let idx = char.charCodeAt(0) - "a".charCodeAt(0);

      if (!current.children[idx] || current.children[idx].char !== char) {
        return "No such word";
      } else {
        current = current.children[idx];
      }
    }

    if (current.eow) {
      words.push(prefix);
    }

    this.getWords(prefix, current, words, "");

    return words;
  }
}

const tree = new Trie();

tree.insert("apple");
tree.insert("battery");
tree.insert("batman");
tree.insert("bat");
tree.insert("bathtub");

console.log(tree.find("bat"));
