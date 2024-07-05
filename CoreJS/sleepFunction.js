function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function main() {
  await sleep(4000);
  console.log("executed");
}

main();
