function aggregateArrayOfObjects(arr, on, who) {
  return arr.reduce((acc, curr) => {
    let currOnVal = curr[on];
    let currWhoVal = curr[who];

    if (acc[currOnVal]) {
      acc[currOnVal] = {
        [on]: currOnVal,
        [who]: [acc[currOnVal][who], currWhoVal],
      };
    } else {
      acc[currOnVal] = {
        [on]: currOnVal,
        [who]: [currWhoVal],
      };
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
