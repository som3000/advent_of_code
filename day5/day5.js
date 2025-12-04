// const bigdata = Deno.readTextFileSync("./day5.txt");
// const bigdataArray = bigdata.split(",");

const array = [3,2,10,2,3,3,4,2,99];

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
    case 3:
      array[array[i+1]] = 1;
      break;

    case 4:
      console.log(array[i+1]);
      break;

    default:
      break;
  }
};

const indexInc = (number, i) => {
  if (number >2) return i +2;
  return i + 4; 
}

const intComputer = (dataArray) => {
  let i = 0
  while (dataArray[i] !== 99) {
    redirect(dataArray, i);
    i = indexInc(dataArray[i], i);
  }

  return dataArray;
};

intComputer(array);

