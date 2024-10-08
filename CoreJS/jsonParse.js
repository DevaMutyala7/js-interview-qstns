class MYJSON {
  static parse(val) {
    if (val === "{}") {
      return {};
    }
    if (val === "[]") {
      return [];
    }
    if (val[0] === "'") {
      throw new Error("Not a valid JSON");
    }
    if (val === undefined) {
      throw new Error("Not a valid JSON");
    } else {
      if (+val === +val) {
        return Number(val);
      }
      if (val[0] === '"') {
        return val.slice(1, -1);
      }

      const initialString = val.slice(1, -1);
      const commaSplittedString = this.splitByComma(initialString);
      if (val[0] === "{") {
        return commaSplittedString.reduce((acc, curr) => {
          if (curr.indexOf(":") > 0) {
            let splitter = curr.indexOf(":");
            let key = curr.slice(0, splitter);
            let val = curr.slice(splitter + 1);
            acc[this.parse(key)] = this.parse(val);
          }
          return acc;
        }, {});
      }
      if (val[0] === "[") {
        return commaSplittedString.map((item) => this.parse(item));
      }
    }
  }

  static splitByComma(obj) {
    let curly = 0,
      brackets = 0,
      rIndex = 0,
      lIndex = 0;
    let res = [];
    while (rIndex <= obj.length) {
      if (obj[rIndex] === "{") {
        curly++;
      }
      if (obj[rIndex] === "}") {
        curly--;
      }
      if (obj[rIndex] === "[") {
        brackets++;
      }
      if (obj[rIndex] === "]") {
        brackets--;
      }
      if (
        (obj[rIndex] === "," && !curly && !brackets) ||
        rIndex === obj.length
      ) {
        res.push(obj.slice(lIndex, rIndex));
        lIndex = rIndex + 1;
      }

      rIndex++;
    }

    return res;
  }
}

obj = {
  a: -9,
  b: { c: 2, d: -3, e: { f: [1, 2, 3] }, h: { i: 5, j: "Good morninig" } },
  z: "im z",
};

console.log(MYJSON.parse(JSON.stringify(obj)));
