class MYJSON {
  static stringify(obj) {
    if (obj === undefined || Array.isArray(obj)) {
      return this.value(obj);
    }
    if (obj === null) {
      return null;
    }

    const objString = Object.keys(obj).map((key) => {
      return `${this.value(key)}:${this.value(obj[key])}`;
    });

    return `{${objString}}`;
  }

  static value(val) {
    const valType = typeof val;
    switch (valType) {
      case "number":
        return Number(val);
      case "string":
        return `"${val}"`;
      case "boolean":
        return val;

      default:
        if (Array.isArray(val)) {
          return `[${val.map((item) => this.value(item)).join(",")}]`;
        }

        return this.stringify(val);
    }
  }
}

let obj1 = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: [1, 2, { a: "d", b: false }],
    h: {
      i: false,
      j: "Good morninig",
    },
  },
};

const real = JSON.stringify(obj1);
const poly = MYJSON.stringify(obj1);
console.log("real", real);
console.log("poly", poly);
console.log(real === poly);
