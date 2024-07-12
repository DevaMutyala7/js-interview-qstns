function digitalClock() {
  setInterval(() => {
    let date = new Date();

    let hours = date.getHours().toString().padStart(2, 0);
    let mins = date.getMinutes().toString().padStart(2, 0);
    let sec = date.getSeconds().toString().padStart(2, 0);

    const clock = `${hours}:${mins}:${sec}`;

    console.log(clock);
  }, 1000);
}

console.log(digitalClock());
