function rgbToHex(rgb) {
  let res = "#";
  for (let item in rgb) {
    let p = rgb[item].toString(16);

    res += p.length == 1 ? "0" + p : p;
  }

  return res;
}

console.log(rgbToHex({ r: 255, g: 51, b: 255 }));
