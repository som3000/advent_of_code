const data = Deno.readTextFileSync("./day2Data.txt");
const dataArray = data.split(",").map(x => parseInt(x))
console.log(dataArray);
