const dataNumArray = Deno.readTextFileSync("./day8part1.txt").split("").map(
  Number,
);

const extractLayer = (textArray, width, depth, startIndex) => {
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
    screen.push(extractLayer(textArray, width, depth, i));
  }
  return screen;
};

// console.log(convertToFormat(sampleArray, 25, 6));

export const occurenceInLayer = (layer, targetNum) => {
  return layer.reduce(
    (acc, line) => {
      if (line.includes(targetNum)) {
        return acc + line.lastIndexOf(targetNum) -
          line.indexOf(targetNum) + 1;
      }
      return acc;
    },
    0,
  );
};

const layerWithLeast0 = (screen) => {
  let least0s = Infinity;
  let indexOfLayerWithLeast0s = 0;
  let i = 0;
  for (const layer of screen) {
    const layer0s = occurenceInLayer(layer, 0);
    if (layer0s < least0s) {
      least0s = layer0s;
      indexOfLayerWithLeast0s = i;
    }
    i++;
  }
  return screen[indexOfLayerWithLeast0s];
};

function main(array, width, depth) {
  const screen = convertToFormat(array, width, depth);
  const targetLayer = layerWithLeast0(screen);
  const occOf1 = occurenceInLayer(targetLayer, 1);
  const occOf2 = occurenceInLayer(targetLayer, 2);

  return occOf1 * occOf2;
}

console.log(main(dataNumArray, 25, 6));