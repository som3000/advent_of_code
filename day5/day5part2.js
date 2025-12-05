// const bigdata = Deno.readTextFileSync("./day5.txt");
// const bigdataArray = bigdata.split(",").map((x) => parseInt(x));

const smallData =
"3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
const smallDataArray = smallData.split(",").map((x) => parseInt(x));

// const debug = (thing) => {
//   console.log(thing);
//   return thing;
// };

const parseExecutionCode = (code) => {
  const codeStr = code + "";
  const paddedStr = codeStr.padStart(4, "0");
  return ({
    opCode: parseInt(paddedStr.slice(-2)),
    para1Mode: parseInt(paddedStr[1]),
    para2Mode: parseInt(paddedStr[0]),
  });
};

const inputAccToMode = (memory, i, mode) => {
  if (mode === 1) {
    return i;
  }

  return memory[i];
};

const jumpIfTrue = (memory, i, { para1Mode, para2Mode }) => {
  if (memory[inputAccToMode(memory, i + 1, para1Mode)] !== 0) {
    return memory[inputAccToMode(memory, i + 2, para2Mode)];
  }
  return i + 3;
};

const jumpIfFalse = (memory, i, { para1Mode, para2Mode }) => {
  if (memory[inputAccToMode(memory, i + 1, para1Mode)] === 0) {
    return memory[inputAccToMode(memory, i + 2, para2Mode)];
  }

  return i + 3;
};

const equals = (memory, i, { para1Mode, para2Mode }) => {
  if (
    memory[inputAccToMode(memory, i + 1, para1Mode)] ===
      memory[inputAccToMode(memory, i + 2, para2Mode)]
  ) {
    memory[memory[i + 3]] = 1;
  } else memory[memory[i + 3]] = 0;
  return i + 4;
};

const lessThan = (memory, i, { para1Mode, para2Mode }) => {
  if (
    memory[inputAccToMode(memory, i + 1, para1Mode)] <
      memory[inputAccToMode(memory, i + 2, para2Mode)]
  ) {
    memory[memory[i + 3]] = 1;
  } else memory[memory[i + 3]] = 0;
  return i + 4;
};

const add = (memory, i, { para1Mode, para2Mode }) => {
  const resultLocation = memory[i+3]
  memory[resultLocation] = memory[inputAccToMode(memory, i + 1, para1Mode)] +
    memory[inputAccToMode(memory, i + 2, para2Mode)];
  return i + 4;
};

const multiply = (memory, i, { para1Mode, para2Mode }) => {
  memory[memory[i + 3]] = memory[inputAccToMode(memory, i + 1, para1Mode)] *
    memory[inputAccToMode(memory, i + 2, para2Mode)];
  return i + 4;
};

const input = (memory, i, { para1Mode }) => {
  const inputAsk = +prompt("Input id");
  memory[inputAccToMode(memory, i + 1, para1Mode)] = inputAsk;
  return i + 2;
};

const output = (memory, i, { para1Mode }) => {
  console.log(memory[inputAccToMode(memory, i + 1, para1Mode)]);
  return i + 2;
};

const redirect = (memory, i) => {
  const formattedEx = parseExecutionCode(memory[i]);
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

  return (operations[formattedEx.opCode](memory, i, formattedEx));
};

const intComputer = (dataArray) => {
  let i = 0;
  while (dataArray[i] !== 99) {
    i = redirect(dataArray, i);
  }
  console.log(dataArray);
};

intComputer(smallDataArray);
