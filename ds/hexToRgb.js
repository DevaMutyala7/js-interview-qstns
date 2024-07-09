function hexToRgb(hex) {
  let hexColor = hex.slice(1);
  let r, g, b;

  if (hexColor.length === 6) {
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4), 16);
  } else {
    r = hexColor.slice(0, 1);
    g = hexColor.slice(1, 2);
    b = hexColor.slice(2);

    r = parseInt(r + r, 16);
    g = parseInt(g + g, 16);
    b = parseInt(b + b, 16);
  }

  return { r, g, b };
}

function hexToRgbRegex(hex) {
  const rgbChar = ["r", "g", "b"];
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

  if (normal) {
    return normal.slice(1).reduce((a, e, i) => {
      a[rgbChar[i]] = parseInt(e, 16);
      return a;
    }, {});
  }

  const shortHand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shortHand) {
    return shortHand.slice(1).reduce((a, e, i) => {
      a[rgbChar[i]] = parseInt(e + e, 16);
      return a;
    }, {});
  }
}

console.log(hexToRgbRegex("#f3f"));
