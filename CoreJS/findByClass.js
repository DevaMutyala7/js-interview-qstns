function getElements(dom, name) {
  let element = [];

  if (dom.className === name) {
    element.push(dom);
  }
  let children = Array.from(dom.children);
  for (let child of children) {
    element = element.concat(getElements(child, name));
  }

  return element;
}

function findByClass(className) {
  const root = document.getElementById("root");

  return getElements(root, className);
}

console.log(findByClass("a"));
