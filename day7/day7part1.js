const bigData = Deno.readTextFileSync("./day7data.txt");
const bigdataArray = bigData.split(",").map((x) => parseInt(x));

const smallData =
  "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
const smallDataArray = smallData.split(",").map((x) => parseInt(x));

const debug = (thing) => {
  console.log(thing);
  return thing;
};

const formatExecutionCode = (code) => {
  const codeStr = code + "";
  const paddedStr = codeStr.padStart(4, "0");
  return ({
    opCode: parseInt(paddedStr.slice(-2)),
    para1Mode: parseInt(paddedStr[1]),
    para2Mode: parseInt(paddedStr[0]),
  });
};

const inputAccToMode = (array, i, mode) => {
  if (mode === 1) {
    return i;
  }

  return array[i];
};

const jumpIfTrue = (array, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] !== 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }
  return i + 3;
};

const jumpIfFalse = (array, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] === 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }

  return i + 3;
};

const equals = (array, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] ===
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const lessThan = (array, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] <
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const add = (array, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] +
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const multiply = (array, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] *
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const storeInput = (array, i,something, input) => {
  array[array[i+1]] = input;
  return i + 2;
};

const output = (array, i, { para1Mode }) => {
  console.log(array[inputAccToMode(array, i + 1, para1Mode)]);
  return i + 2;
};

const redirect = (array, i, input) => {
  const formattedEx = formatExecutionCode(array[i]);
  const operations = {
    1: add,
    2: multiply,
    3: storeInput,
    4: output,
    5: jumpIfTrue,
    6: jumpIfFalse,
    7: lessThan,
    8: equals,
  };

  return (operations[formattedEx.opCode](array, i, formattedEx, input));
};

const intComputer = (dataArray, input) => {
  let i = 0;
  while (dataArray[i] !== 99) {
    i = redirect(dataArray, i, input);
  }
  console.log(dataArray);
};

intComputer(smallDataArray, 9);
