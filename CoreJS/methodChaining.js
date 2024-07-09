function Calculator() {
  this.total = 0;

  this.add = (val) => {
    this.total += val;
    return this;
  };

  this.substract = (val) => {
    this.total -= val;
    return this;
  };

  this.multiply = (val) => {
    this.total *= val;
    return this;
  };

  this.divide = (val) => {
    this.total /= val;
    return this;
  };
}

let calci = new Calculator();
calci.add(10).multiply(10);
console.log(calci.total);
