function addAndSort(track, index, tag) {
  if (!track[index]) {
    track[index] = [];
  }
  track[index] = [...track[index], tag];
  track[index].sort((a, b) => b.getRange() - a.getRange());
}

function Tag(start, end, tag) {
  this.start = start;
  this.end = end;
  this.tag = tag;
  this.text = "";
  this.getRange = function () {
    return this.end - this.start;
  };
}

function Stack() {
  let items = [];
  let top = 0;

  this.push = function (element) {
    items[top++] = element;
  };

  this.pop = function () {
    return items[--top];
  };

  this.peek = function () {
    return items[top - 1];
  };
}

function parse(str, markUps) {
  const track = new Array(str.length).fill(0);

  for (let i = 0; i < markUps.length; i++) {
    const [start, end, tag] = markUps[i];
    addAndSort(track, start, new Tag(start, end, tag));
  }

  const html = new Stack();
  html.push(new Tag(0, Number.MAX_VALUE, ""));

  for (let i = 0; i < str.length; i++) {
    while (track[i] && track[i].length > 0) {
      const curr = track[i].shift();
      curr.text = `<${curr.tag}>`;

      if (curr.end > html.peek().end) {
        const split = new Tag(html.peek().end + 1, curr.end, curr.tag);
        curr.end = html.peek().end;
        addAndSort(track, html.peek().end + 1, split);
      }
      html.push(curr);
    }

    html.peek().text += str[i];

    while (html.peek().end === i) {
      const closingTag = `</${html.peek().tag}>`;
      html.peek().text += closingTag;
      const popped = html.pop();
      html.peek().text += popped.text;
    }
  }

  return html.pop().text;
}

const str = "Hello,world";
const styleArr = [
  [0, 2, "i"],
  [0, 9, "b"],
  [7, 10, "u"],
];

console.log(parse(str, styleArr));
