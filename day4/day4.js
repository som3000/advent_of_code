const frequency = (number, i, array) => {
  let count = 0;
  for (let i = 0; i < 6; i++) {
    if (number === array[i]) count++;
  }
  return count;
};

const twoAdjDigitsOnly = (number) => {
  const digits = (number + "").split("");
  const frequencies = digits.map(frequency);
  return frequencies.some(x => x===2);
};

const digitsNeverDecreases = (number) => {
  const digits = (number + "").split("").map((x) => parseInt(x));
  let i = 0;
  while (i < digits.length) {
    if (digits[i] > digits[++i]) return false;
  }
  return true;
};

const meetsCriterion = (number) => {
  if (twoAdjDigitsOnly(number)) {
    return digitsNeverDecreases(number);
  }
  return false;
};

const checkRange = (rangeStart, rangeEnd) => {
  let counter =0;
  for (let currNum = rangeStart; currNum <= rangeEnd; currNum++) {
    if (meetsCriterion(currNum)) counter++;
  }

  return counter;
};

console.log(checkRange(147981, 691423));
