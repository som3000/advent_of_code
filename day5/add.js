const bigdata = Deno.readTextFileSync("./day5.txt");
const bigdataArray = bigdata.split(",").map((x) => parseInt(x));

const smallData =
  "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
const smallDataArray = smallData.split(",").map((x) => parseInt(x));

const debug = (thing) => console.log(thing);

const formatExecutionCode = (code) => {
  const codeStr = code += "";
  const paddedStr = codeStr.padStart(5, "0");
  return ({
    opCode: parseInt(paddedStr.slice(-2)),
    para1Mode: parseInt(paddedStr[2]),
    para2Mode: parseInt(paddedStr[1]),
    para3Mode: parseInt(paddedStr[0]),
  });
};

const inputAccToMode = (array, i, mode) => {
  if (mode === 0) return array[i];
  return i;
};

const add = (array, i, { para1Mode, para2Mode}) => {

  array[array[i + 3]] =
    array[inputAccToMode(array, i + 1, para1Mode)] +
    array[inputAccToMode(array, i + 2, para2Mode)];

  return i+4;
};

const multiply = (array, i, { para1Mode, para2Mode, para3Mode }) => {
  array[array[i + 3]] =
    array[inputAccToMode(array, i + 1, para1Mode)] *
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const input = (array, i) => {
  array[array[i]] = 1;
  return i + 2;
};

// const jumpIfTrue = (array, i, { para1Mode, para2Mode }) => {
//   if (array[inputAccToMode(array, i + 1, para1Mode)] !== 0) {
//     return inputAccToMode(array, i + 2, para2Mode);
//   }
//   return i + 2;
// };

// const jumpIfFalse = (array, i, { para1Mode, para2Mode }) => {
//   if (array[inputAccToMode(array, i + 1, para1Mode)] === 0) {
//     return inputAccToMode(array, i + 2, para2Mode);
//   }
//   return i + 2;
// };

// const equals = (array, i, { para1Mode, para2Mode, para3Mode }) => {
//   if (
//     array[inputAccToMode(array, i + 1, para1Mode)] ===
//       array[inputAccToMode(array, i + 2, para2Mode)]
//   ) {
//     array[i + 3] = 1;
//   } else array[inputAccToMode(array, i + 3, para3Mode)] = 0;
//   return i + 4;
// };

// const lessThan = (array, i, { para1Mode, para2Mode, para3Mode }) => {
//   if (
//     array[inputAccToMode(array, i + 1, para1Mode)] <
//       array[inputAccToMode(array, i + 2, para2Mode)]
//   ) {
//     array[i + 3] = 1;
//   } else array[inputAccToMode(array, i + 3, para3Mode)] = 0;
//   return i + 4;
// };

const output = (array, i, { para1Mode }) => {
  console.log(array[inputAccToMode(array, i + 1, para1Mode)]);
  return i + 2;
};

const redirect = (array, i) => {
  const formattedEx = formatExecutionCode(array[i]);
  debug(formattedEx.opCode)
  
  const operations = ({
    1: add,
    2: multiply,
    3: input,
    4: output,
    // 5: jumpIfTrue,
    // 6: jumpIfFalse,
    // 7: lessThan,
    // 8: equals,
  });
  console.log(typeof operations[formattedEx.opCode]);

  return operations[formattedEx.opCode](array, i, formattedEx);
};

const intComputer = (dataArray) => {
  let i = 0;
  while (dataArray[i] !== 99) {
    i = redirect(dataArray, i);
  }
};

intComputer(bigdataArray);
