function aggregateArrayOfObjects(arr, on, who) {
  return arr.reduce((acc, curr) => {
    let On = curr[on];
    let Who = curr[who];
    if (acc[On]) {
      acc[On] = [...acc[On], Who];
    } else {
      acc[On] = [Who];
    }

    return acc;
  }, {});
}

const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "js", user: "Chad" },
  { skill: "html", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "js", user: "Sue" },
  { skill: "html", user: "Sue" },
];

console.log(aggregateArrayOfObjects(endorsements, "user", "skill"));
