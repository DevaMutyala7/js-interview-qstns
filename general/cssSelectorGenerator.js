function generateCssSelector(root, target) {
  let result = getPath(root, target);

  return result.join("  ==>  ");
}

function getPath(root, target) {
  let path = [];

  if (target.parentNode.tagName.toLowerCase() === "body") {
    return [`${target.tagName.toLowerCase()}:[id='${root.id}']`];
  }

  let index = Array.from(target.parentNode.children).indexOf(target);
  let current = `${target.tagName.toLowerCase()}:nth-child(${index + 1})`;
  path.unshift(current);

  return getPath(root, target.parentNode).concat(path);
}

const root = document.getElementById("root");
const target = document.getElementById("target");

console.log(root.parentNode);

console.log(generateCssSelector(root, target));
