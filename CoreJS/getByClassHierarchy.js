function getResult(dom, classes) {
  let elements = [];
  let currentClass = classes[0];
  if (dom.className === currentClass) {
    if (classes.length === 1) {
      elements.push(dom);
    }
    let children = Array.from(dom.children);
    for (let child of children) {
      elements = elements.concat(getResult(child, classes.slice(1)));
    }
  }

  return elements;
}

function getByClassHierarchy(classPath) {
  const classes = classPath.split(">");
  const dom = document.getElementById("a-1");

  return getResult(dom, classes);
}

console.log(getByClassHierarchy("a>b>c"));
