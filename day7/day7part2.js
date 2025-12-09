import { intComputer } from "./intComputerPart2.js";
import { permutations } from "@std/collections";

const bigData = Deno.readTextFileSync("./day7data.txt");
const bigdataArray = bigData.split(",").map((x) => parseInt(x));

// const smallData =
//   "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
// const smallDataArray = smallData.split(",").map((x) => parseInt(x));

// const debug = (thing) => {
//   console.log(thing);
//   return thing;
// };

const amplifier = (ampData, firstInput, inputAfter1st3) => {
  return intComputer(ampData, firstInput, inputAfter1st3);
};

const amplifierSetup = (data) => ({
  0: { dataCopy: data.slice(), startIndex: 0, iterNum: 1, isHalted: false },
  1: { dataCopy: data.slice(), startIndex: 0, iterNum: 1, isHalted: false },
  2: { dataCopy: data.slice(), startIndex: 0, iterNum: 1, isHalted: false },
  3: { dataCopy: data.slice(), startIndex: 0, iterNum: 1, isHalted: false },
  4: { dataCopy: data.slice(), startIndex: 0, iterNum: 1, isHalted: false },
});


const amplifierLoopingSimulator = (phaseArray) => {
  const allAmpData = amplifierSetup(bigdataArray);
  let output = 0;
  let ampNum = 0;
  while (true) {  
    output = amplifier(allAmpData[ampNum], phaseArray[ampNum], output);
    if (ampNum === 4 && allAmpData[ampNum].isHalted) return output;
    ampNum = (ampNum + 1) % 5;
  }
};



console.log(permutations([5,6,7,8,9]).map(x => amplifierLoopingSimulator(x)).sort((a,b) => b-a));
// console.log(permutations([5,6,7,8,9]));
