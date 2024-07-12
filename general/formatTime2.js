function railwayHoursTo12(time) {
  let [hours, mins] = time.split(":");

  const format = parseInt(hours) >= 12 ? "PM" : "AM";

  hours = hours > 12 ? hours - 12 : hours == 0 ? 12 : hours;

  return `${
    hours.toString().padStart(2, 0) +
    ":" +
    mins.slice(0, -2).padStart(2, 0) +
    format
  }`;
}

console.log(railwayHoursTo12("00:00"));
