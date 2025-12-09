import { intComputer } from "./intComputer.js";
import { permutations } from "@std/collections";

const bigData = Deno.readTextFileSync("./day7data.txt");
const bigdataArray = bigData.split(",").map((x) => parseInt(x));

// const smallData = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
// const smallDataArray = smallData.split(",").map((x) => parseInt(x));

// const debug = (thing) => {
//   console.log(thing);
//   return thing;
// };

const amplifier = (dupData, inputAfter1st3, firstInput) => {
  return intComputer(dupData ,firstInput, inputAfter1st3)
}

const amplifierSimulator = (dataArray, phaseArray) => {
  const dupData = dataArray.slice();
  let output = 0;
  for(let ampNum = 0; ampNum < 5; ampNum++){
    output = amplifier(dupData, output, phaseArray[ampNum])
  }
  return output;
}

// console.log(amplifierSimulator(smallDataArray, [4,3,2,1,0]));


// console.log(permutations([0,1,2,3,4]).map(x => amplifierSimulator(bigdataArray, x)).sort((a,b) => b-a));
