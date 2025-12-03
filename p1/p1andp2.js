const data = Deno.readTextFileSync("./p1.txt");
const dataArray = data.split("\n").map((x) => parseInt(x));

const fuelCalculator = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const addingFuelCalculator = (massInConsideration) => {
  let fuelAdded = 1;
  let totalFuelAdded = 0;
  while (fuelAdded !== 0) {
    fuelAdded = Math.floor(massInConsideration / 3) - 2;
    fuelAdded = fuelAdded > 0 ? fuelAdded : 0;
    massInConsideration = fuelAdded;
    totalFuelAdded += fuelAdded;
  }
  return totalFuelAdded;
};

const main1 = (array) => {
  return array.reduce((acc, x) => acc + fuelCalculator(x), 0);
};

const main2 = (array) => {
  return array.reduce((acc, x) => acc + addingFuelCalculator(x), 0);
};

console.log(main1(dataArray));
console.log(main2(dataArray));
