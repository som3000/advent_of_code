const bigdata = Deno.readTextFileSync("./day5.txt");
const bigdataArray = bigdata.split(",").map((x) => parseInt(x));

// const smallData = "1,2,3,4,5";
// const smallDataArray = smallData.split(",").map((x) => parseInt(x));

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

const add = (array, i, { para1Mode, para2Mode, para3Mode }) => {
  array[inputAccToMode(array, i + 3, para3Mode)] =
    array[inputAccToMode(array, i + 1, para1Mode)] +
    array[inputAccToMode(array, i + 2, para2Mode)];
};

const multiply = (array, i, { para1Mode, para2Mode, para3Mode }) => {
  array[inputAccToMode(array, i + 3, para3Mode)] =
    array[inputAccToMode(array, i + 1, para1Mode)] *
    array[inputAccToMode(array, i + 2, para2Mode)];
};

const input = (array, i, { para1Mode }) => {
  array[inputAccToMode(array, i + 1, para1Mode)] = 1;
};

const output = (array, i, { para1Mode }) =>
  console.log(array[inputAccToMode(array, i + 1, para1Mode)]);

const redirect = (array, i) => {
  const formattedEx = formatExecutionCode(array[i]);
  const operations = { 1: add, 2: multiply, 3: input, 4: output };

  operations[formattedEx.opCode](array, i, formattedEx);
};

const indexInc = (exCode, i) => {
  if ("34".includes(exCode + "")) return i + 2;
  return i + 4;
};

const intComputer = (dataArray) => {
  let i = 0;
  while (dataArray[i] !== 99) {
    redirect(dataArray, i);
    i = indexInc(dataArray[i] % 10, i);
  }
};

intComputer(bigdataArray);
