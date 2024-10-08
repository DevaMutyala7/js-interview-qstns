function getAccumulator(props, value, acc) {
  if (props.length === 1) {
    acc[props[0]] = value;
    return acc;
  }

  const key = props.shift();

  if (!acc[key]) {
    acc[key] = {};
  }
  getAccumulator(props, value, acc[key]);

  return acc;
}

function aggregateValues(form) {
  let inputs = Array.from(form.children);
  return inputs.reduce((acc, curr) => {
    const props = curr.name.split(".");
    const value = curr.value;

    let temp = acc;
    props.forEach((key, index) => {
      if (index === props.length - 1) {
        temp[key] = value;
        return temp;
      }
      if (!(key in acc)) {
        temp[key] = {};
      }
      temp = temp[key];
    });

    return acc;
  }, {});
}

const form = document.getElementById("parent");
console.log(aggregateValues(form));
