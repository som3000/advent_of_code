const dataNumArray = Deno.readTextFileSync("./day8part1.txt").split("").map(
  Number,
);

const makeLayer = (textArray, width, depth, startIndex) => {
  const layer = [];
  for (
    let index = startIndex;
    index < startIndex + (width * depth);
    index = index + width
  ) {
    layer.push(
      textArray.slice(index, index + width).sort((a, b) => a - b),
    );
  }
  return layer;
};

const convertToFormat = (textArray, width, depth) => {
  const screen = [];
  for (let i = 0; i < textArray.length; i = i + width * depth) {
    screen.push(makeLayer(textArray, width, depth, i));
  }
  return screen;
};

// console.log(convertToFormat(dataNumArray, 25, 6));

const occurence = (layer, number) => {
  let zeroes = 0;
  for (let lineNum = 0; lineNum < 6; lineNum++) {
    // console.log(layer);

    zeroes += layer[lineNum].lastIndexOf(number) -
      layer[lineNum].indexOf(number) + 1;
  }
  return zeroes;
};

const layerWithLeast0 = (screen) => {
  const numOf0inLayers = [];
  for (let layerNum = 0; layerNum < screen.length; layerNum++) {
    numOf0inLayers.push(occurence(screen[layerNum], 0));
  }
  console.log({numOf0inLayers});
  

  const least0sinLayer = numOf0inLayers.toSorted((a, b) => a - b)[0];

  return screen[numOf0inLayers.indexOf(least0sinLayer)];
};

const main = (array, width, depth) => {
  const screen = convertToFormat(array, width, depth);
  console.log({ screen });

  // const layer = screen[layerNum];
  // console.log(layer);
  const targetLayer = layerWithLeast0(screen);
  console.log(targetLayer);
  const numOf1 = occurence(targetLayer, 1);
  const numOf2 = occurence(targetLayer, 2);
  return numOf1 * numOf2;
};

console.log(main(dataNumArray, 25, 6));
