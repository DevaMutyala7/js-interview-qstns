function aggregateArrayOfObjects(arr, on, who) {
  let agg = arr.reduce((acc, curr) => {
    let onValue = curr[on];
    let whoValue = curr[who];
    if (acc[onValue]) {
      acc[onValue] = {
        [on]: onValue,
        [who]: [...acc[onValue][who], whoValue],
      };
    } else {
      acc[curr[on]] = {
        [on]: curr[on],
        [who]: [curr[who]],
      };
    }
    return acc;
  }, {});

  return Object.values(agg);
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
