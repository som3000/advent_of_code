const planetsOrbit = "COM)FPL\nFPL)8XZ"
const orbitalData= Deno.readTextFileSync("./day6data.txt")

const breakOrbitToArray = str => {
  return str.split("\n").map(x => x.split(")"))
}

const breakOrbitsIntoObject = str => {
  const array = breakOrbitToArray(str);
  const orbits ={};
  for(let i = 0; i< array.length; i++) {
    orbits[array[i][1]] =  array[i][0]
  }
  return orbits;
}

const planetTotalOrbit = (planet,orbits,counter) => {
  if(orbits[planet] === undefined) return counter;
  counter++;
  return planetTotalOrbit(orbits[planet], orbits, counter)
}

const countOrbits = orbitsAsObject => {
  let counter = 0;
  for(const orbiter in orbitsAsObject) {
    counter += planetTotalOrbit(orbiter, orbitsAsObject, 0)
  }
  return counter;
}

console.log(countOrbits(breakOrbitsIntoObject(orbitalData)));
