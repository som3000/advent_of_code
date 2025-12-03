const data = Deno.readTextFileSync("./day2Data.txt");
const dataArray = data.split(",").map((x) => parseInt(x));
dataArray[1]=12;
dataArray[2]=2;

const add = (array, i) => {
  array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]];
};

const multiply = (array, i) => {
  array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]];
};

const redirect = (array, i) => {
  switch (array[i]) {
    case 1:
      add(array, i);
      break;
    case 2:
      multiply(array, i);
      break;

    default:
      break;
  }
};

const intComputer = (dataArray) => {
  const iterationArray = dataArray.slice();

  for (let i = 0; iterationArray[i] !== 99; i = i + 4) {
    redirect(iterationArray, i);
  }

  return iterationArray.join(",");
};

console.log(intComputer(dataArray));