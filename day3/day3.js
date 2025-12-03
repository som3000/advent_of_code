const wiresData = Deno.readTextFileSync("./day3data.txt").split("\n");

const splitDirAndValue = (x) => ({
  instruction: x[0],
  value: parseInt(x.slice(1)),
});

const wire1 = wiresData[0].split(",").map(splitDirAndValue);
const wire2 = wiresData[1].split(",").map(splitDirAndValue);

const move = (pathTillNow, units, deltas) => {
  let x = pathTillNow[0][0];
  let y = pathTillNow[0][1];
  for (let i = 0; i < units; i++) {
    x = x + deltas[0];
    y = y + deltas[1];
    pathTillNow.unshift([x, y]);
  }
  return pathTillNow;
};

const executeCmd = (pathTraced, cmd) => {
  switch (cmd.instruction) {
    case "R":
      return move(pathTraced, cmd.value, [1, 0]);
    case "L":
      return move(pathTraced, cmd.value, [-1, 0]);
    case "U":
      return move(pathTraced, cmd.value, [0, 1]);
    case "D":
      return move(pathTraced, cmd.value, [0, -1]);
    default:
      break;
  }
};

const tracePath = (wireCmd, initialPoint) => {
  return wireCmd.reduce((acc, x) => executeCmd(acc, x), [initialPoint]);
};

const wire1ArrayOfPoints = tracePath(wire1, [0, 0]).map((x) => x + "");
const wire2ArrayOfPoints = tracePath(wire2, [0, 0]).map((x) => x + "");

const findIntersection = (array1, array2) => {
  return array1.filter((x) => array2.includes(x));
};

// findIntersection(wire1ArrayOfPoints, wire2ArrayOfPoints).map(x => x.split(",").map(x => parseInt(x))).map(x => manhattanDistn([0,0], x))

// const intersectionPointsFound =[
//   "4503,1752", "4303,1752",
//   "4052,1974", "3791,1974",
//   "3791,1598", "3385,1259",
//   "2511,1383", "1403,1850",
//   "1381,1565", "970,1387",
//   "970,1159",  "2072,1383",
//   "2546,1383", "2326,1383",
//   "1906,1428", "1381,1428",
//   "2487,1383", "0,0"
// ].map(x => x.split(",").map(x => parseInt(x)));

// const intersectionPointsFound = [
//   [4503, 1752],
//   [4303, 1752],
//   [4052, 1974],
//   [3791, 1974],
//   [3791, 1598],
//   [3385, 1259],
//   [2511, 1383],
//   [1403, 1850],
//   [1381, 1565],
//   [970, 1387],
//   [970, 1159],
//   [2072, 1383],
//   [2546, 1383],
//   [2326, 1383],
//   [1906, 1428],
//   [1381, 1428],
//   [2487, 1383],
// ];

// const manhattanDistn = (p1, p2) => {
//   return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
// };

// console.log(intersectionPointsFound.map(x => manhattanDistn([0,0], x)));

// [parseInt(x[0]),parseInt(x[1])]
