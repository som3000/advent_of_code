const dataNumArray = Deno.readTextFileSync("./day8part1.txt").split("").map(
  Number,
);

const convertToFormat = (textArray, width, depth) => {
  const screen = [];
  for (let index = 0; index < (width * depth); index = index + width) {
    screen.push(
      textArray.slice(index, index + width + 1).sort((a, b) => a - b),
    );
  }
  return screen;
};

// console.log(convertToFormat(dataNumArray, 25, 6));

const occurence = (lineArray, number) => {
  return (lineArray.lastIndexOf(number) - lineArray.indexOf(number) + 1);
};

const lineWithLeast0 = (lineArray) => {
  const numOf0inLine = [];
  for (let lineNum = 0; lineNum < lineArray; lineNum++) {
    numOf0inLine.push(occurence(lineArray[lineNum], 0));
  }
  // return lineArray[numOf0inLine.indexOf(numOf0inLine.sort((a,b) => a-b)[0])];
  return numOf0inLine;
};

console.log(lineWithLeast0(convertToFormat(dataNumArray,25,6)));
