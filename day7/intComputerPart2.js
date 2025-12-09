// const smallData = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";

// const smallDataArray = smallData.split(",").map((x) => parseInt(x));

const inputAccToMode = (array, i, mode) => {
  if (mode === 1) {
    return i;
  }
  return array[i];
};

const jumpIfTrue = ({ array }, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] !== 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }
  return i + 3;
};

const jumpIfFalse = ({ array }, i, { para1Mode, para2Mode }) => {
  if (array[inputAccToMode(array, i + 1, para1Mode)] === 0) {
    return array[inputAccToMode(array, i + 2, para2Mode)];
  }

  return i + 3;
};

const equals = ({ array }, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] ===
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const lessThan = ({ array }, i, { para1Mode, para2Mode }) => {
  if (
    array[inputAccToMode(array, i + 1, para1Mode)] <
      array[inputAccToMode(array, i + 2, para2Mode)]
  ) {
    array[array[i + 3]] = 1;
  } else array[array[i + 3]] = 0;
  return i + 4;
};

const add = ({ array }, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] +
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const multiply = ({ array }, i, { para1Mode, para2Mode }) => {
  array[array[i + 3]] = array[inputAccToMode(array, i + 1, para1Mode)] *
    array[inputAccToMode(array, i + 2, para2Mode)];
  return i + 4;
};

const input = (iteratableData, i) => {
  let currInput = iteratableData.inputFromPrev;
  if (iteratableData.firstUse3 && (iteratableData.iteration === 1)) {
    currInput = iteratableData.phaseCode;
    iteratableData.firstUse3 = false;
  }
  iteratableData.array[iteratableData.array[i + 1]] =
    currInput;
  return i + 2;
};

const output = (iteratableData, i, { para1Mode }) => {
  iteratableData.result =
    iteratableData
      .array[inputAccToMode(iteratableData.array, i + 1, para1Mode)];
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

export const intComputer = (ampData, phCode, prevInput) => {
  const iteratableData = {
    array: ampData.dataCopy,
    result: prevInput,
    firstUse3: true,
    phaseCode: phCode,
    inputFromPrev: prevInput,
    iteration : ampData.iterNum,
  };
  let i = ampData.startIndex;
  while (ampData.dataCopy[i] !== 99) {
    if ((ampData.dataCopy[i] + "").slice(-1) === "4") {
      ampData.startIndex = redirect(iteratableData, i);
      ampData.iterNum++;
      return iteratableData.result;
    }
    i = redirect(iteratableData, i);
  }
  ampData.isHalted = true;
  return prevInput;
};

// const phaseCode = parseInt(prompt("phaseCode : "));
// const inputFromPrev = parseInt(prompt("inputFromPrev : "));
// const smallData =
//   "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
// const data = smallData.split(",").map((x) => parseInt(x));
// intComputer({ dataCopy: data.slice(), startIndex: 0, iterNum: 2}, phaseCode,inputFromPrev);
