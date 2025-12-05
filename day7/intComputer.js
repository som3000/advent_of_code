const smallData = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";

const smallDataArray = smallData.split(",").map((x) => parseInt(x));

const inputAccToMode = (array, i, mode) => {
  if (mode === 1) {
    return i;
  }
  return array[i];
};

const jumpIfTrue = ({array}, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] !== 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }
  return i + 3;
};

const jumpIfFalse = ({array}, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] === 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }

  return i + 3;
};

const equals = ({array}, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] ===
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const lessThan = ({array}, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] <
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const add = ({array}, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] +
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const multiply = ({array}, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] *
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const input = (iteratableData, i, { para1Mode }) => {
  let currInput = iteratableData.inputFromPrev;
  if(iteratableData.firstUse3) {
    currInput = iteratableData.phaseCode
    iteratableData.firstUse3 = false;
  };
  iteratableData.array[inputAccToMode(iteratableData.array, i + 1, para1Mode)] = currInput;
  return i + 2;
};

const output = (iteratableData, i, { para1Mode }) => {
  iteratableData.result = iteratableData.array[inputAccToMode(iteratableData.array, i + 1, para1Mode)];
  return i + 2;
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

const redirect = (iteratableData, i) => {
  const formattedEx = formatExecutionCode(iteratableData.array[i]);
  const operations = {
    1: add,
    2: multiply,
    3: input,
    4: output,
    5: jumpIfTrue,
    6: jumpIfFalse,
    7: lessThan,
    8: equals,
  };

  return (operations[formattedEx.opCode](iteratableData, i, formattedEx));
};

export const intComputer = (dataArray, phCode, prevInput) => {
  const iteratableData = {array: dataArray, result : 0, firstUse3: true, phaseCode: phCode, inputFromPrev : prevInput}
  let i = 0;
  while (dataArray[i] !== 99) {
    i = redirect(iteratableData, i);
  }
  return iteratableData.result;
};

// const phaseCode = parseInt(prompt("phaseCode : "));
// const inputFromPrev = parseInt(prompt("inputFromPrev : "));

// intComputer(smallDataArray, phaseCode,inputFromPrev);