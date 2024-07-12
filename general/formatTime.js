function formatToRailwayTime(time) {
  let formattedTime = "";
  let isAM = time.endsWith("AM");

  let [hours, mins] = time.split(":");

  if (isAM) {
    hours = hours === "12" ? "0" : hours;
  } else {
    hours = hours === "12" ? hours : String(+hours + 12);
  }

  return `${hours.padStart(2, 0) + ":" + mins.slice(0, -2).padStart(2, 0)}`;
}

console.log(formatToRailwayTime("1:10PM"));
