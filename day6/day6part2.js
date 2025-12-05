const planetsOrbit = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;
const orbitalData= Deno.readTextFileSync("./day6data.txt")

const breakOrbitToArray = (str) => {
  return str.split("\n").map((x) => x.split(")"));
};

const breakOrbitsIntoObject = (str) => {
  const array = breakOrbitToArray(str);
  const orbits = {};
  for (let i = 0; i < array.length; i++) {
    orbits[array[i][1]] = array[i][0];
  }
  return orbits;
};

const pathToCom = (orbitsObject, startPoint) => {
  let currentPlanet = orbitsObject[startPoint];
  const path = [];
  while (currentPlanet !== "COM") {
    path.push(currentPlanet);
    currentPlanet = orbitsObject[currentPlanet];
  }
  return path;
};

const commonPoint = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    if (array2.includes(array1[i])) return array1[i];
  }
};

const orbitsTransfer = (orbitsObject) => {
  const youPathToCom = pathToCom(orbitsObject, "YOU");
  const sanPathToCom = pathToCom(orbitsObject, "SAN");
  const commonPlanet = commonPoint(youPathToCom, sanPathToCom);
  const youDistToCommonPoint =
    youPathToCom.slice(0, youPathToCom.indexOf(commonPlanet) + 1).length;
  const sanDistToCommonPoint =
    sanPathToCom.slice(0, sanPathToCom.indexOf(commonPlanet) + 1).length;
  return youDistToCommonPoint + sanDistToCommonPoint - 2;
};

console.log(orbitsTransfer(breakOrbitsIntoObject(orbitalData)));

// const planetTotalOrbit = (planet,orbits,counter) => {
//   if(orbits[planet] === undefined) return counter;
//   counter++;
//   return planetTotalOrbit(orbits[planet], orbits, counter)
// }

// const countOrbits = orbitsAsObject => {
//   let counter = 0;
//   for(const orbiter in orbitsAsObject) {
//     counter += planetTotalOrbit(orbiter, orbitsAsObject, 0)
//   }
//   return counter;
// }

// console.log(countOrbits(breakOrbitsIntoObject(orbitalData)));
