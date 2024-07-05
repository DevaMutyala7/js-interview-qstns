class HashSet {
  constructor() {
    this.obj = {};
  }

  put(key, value) {
    if (!this.has(key)) {
      this.obj[key] = value;
    }
  }

  get(key) {
    return this.obj[key] || -1;
  }

  has(key) {
    return this.obj[key] ? true : false;
  }
}

let set = new HashSet();

set.put("a", 10);
set.put("b", 20);
set.put("c", 30);
set.put("c", 50);

console.log(set.get("c"));
