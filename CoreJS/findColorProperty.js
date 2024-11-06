function getElementsWithColor(dom, hexColor) {
  let elements = [];

  let currentHexColor =
    dom.style.color &&
    "#" +
      getComputedStyle(dom)
        .color.replace(/[rgb)(]/g, "")
        .split(",")
        .map((num) => parseInt(num).toString(16))
        .join("");

  if (currentHexColor === hexColor) {
    elements.push(dom);
  }

  for (let child of dom.children) {
    elements = elements.concat(getElementsWithColor(child, hexColor));
  }

  return elements;
}

function findColorProperty(dom, color) {
  const tempElement = document.createElement("div");
  tempElement.style.color = color;

  document.body.appendChild(tempElement);

  const hexColor =
    "#" +
    getComputedStyle(tempElement)
      .color.replace(/[rgb)(]/g, "")
      .split(",")
      .map((num) => parseInt(num).toString(16))
      .join("");

  document.body.removeChild(tempElement);

  return getElementsWithColor(dom, hexColor);
}

console.log(findColorProperty(document.getElementById("root"), "white"));
