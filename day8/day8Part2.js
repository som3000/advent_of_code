const extractLayer = (textArray, width, depth, startIndex) => {
  const layer = [];
  for (
    let index = startIndex;
    index < startIndex + (width * depth);
    index = index + width
  ) {
    layer.push(
      textArray.slice(index, index + width),
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

const dataNumArray = Deno.readTextFileSync("./day8part1.txt").split("").map(
  Number,
);

const visiblePixel = (screen,lineNum,charNum) => {
  let layerNum = 0;
  // const pixels = {0 : " ", 1 : "*", 2: "-"}
  while (layerNum < screen.length) {
    if (screen[layerNum][lineNum][charNum] === 1) return "⬜️";
    if (screen[layerNum][lineNum][charNum] === 0) return "⬛️";
    layerNum++;
  }
  return "✅";
}

const overlapAndPixelateLayer = (screen) => {
  const layerBeingOverlapped = screen[0];
  const depth = screen[0].length; 
  const width = screen[0][0].length;
  for (let lineNum = 0; lineNum < depth; lineNum++) {
    for (let charNum = 0; charNum < width; charNum++) {
      layerBeingOverlapped[lineNum][charNum] = visiblePixel(screen, lineNum, charNum);
    }
  }
  return layerBeingOverlapped;
};

// console.log(overlapAndPixelateLayer([[[0,2],[2,2]],[[1,1],[2,2]],[[2,2],[1,2]], [[0,0], [0,0]]]));


function main() {
  const screen = convertToFormat(dataNumArray, 25, 6);
  // console.log(screen);
  
  const pixelatedScreen = overlapAndPixelateLayer(screen);
  // console.log(pixelatedScreen);
  const imageStr = pixelatedScreen.map(x => x.join("")).join("\n");
  return imageStr;
}

console.log(main());
