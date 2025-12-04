const data = Deno.readTextFileSync("./day2Data.txt");
const dataArray = data.split(",").map((x) => parseInt(x));
dataArray[1] = 0;
dataArray[2] = 0;

const add = (array, i) => {
  array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]];
};

const multiply = (array, i) => {
  array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]];
};

const redirect = (array, i) => {
  const operations = {1 : add, 2: multiply};
  operations[array[i]](array, i)
};

const intComputer = (dataArray) => {
  const iterationArray = dataArray.slice();
  let i = 0
  while (iterationArray[i] !== 99) {
    redirect(iterationArray, i);
    i = i + 4;
  }

  return iterationArray;
};

let found = false;
const currInputs = [-1, 0];

while (!found && currInputs[1] < 100) {
  currInputs[0] = 0;
  ++currInputs[1];
  while (!found && currInputs[0] < 100) {
    const dataDup = dataArray.slice();
    dataDup[1] = ++currInputs[0];
    dataDup[2] = currInputs[1];
    const result = intComputer(dataDup);
    if (result[0] === 19690720) found = true;
  }
}

console.log(currInputs[0]*100 + currInputs[1]);
