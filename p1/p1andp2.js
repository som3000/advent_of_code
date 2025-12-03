const data = Deno.readTextFileSync("./p1.txt");
const dataArray = data.split("\n").map((x) => parseInt(x));

const fuelCalculator = (number) => {
  return Math.floor(number / 3) - 2;
};

const main = (array) => {
  return array.reduce((acc, x) => acc + fuelCalculator(x), 0);
};

console.log(main(dataArray));
