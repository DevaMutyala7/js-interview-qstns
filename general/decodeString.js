class Tag {
  constructor(char) {
    this.word = char;
  }

  add(char) {
    this.word += char;
  }
}

class Stack {
  constructor() {
    this.arr = [];
    this.index = -1;
    this.size = 0;
  }

  insert(val) {
    this.arr[++this.index] = val;
    this.size++;
  }

  remove() {
    this.size--;
    return this.arr[this.index--];
  }

  peek() {
    return this.arr[this.index];
  }
}

function decodeString(str) {
  let counterStack = new Stack();
  let charStack = new Stack();
  let insert = true;
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!isNaN(parseInt(char))) {
      insert = true;
      counterStack.insert(parseInt(char));
    } else if (char !== "[" && char !== "]") {
      if (insert) {
        charStack.insert(new Tag(str[i]));
      } else {
        let existingStr = charStack.peek();
        existingStr.add(str[i]);
      }
      insert = false;
    }
  }

  while (counterStack.size > 0) {
    let num = counterStack.remove();
    let char = charStack.remove();

    let temp = char.word + result;

    result = temp.repeat(num);
  }

  return result;
}

console.log(decodeString("2[a2[b]]"));
console.log(decodeString("3[b2[ca]]"));
