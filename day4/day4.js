const twoAdjDigitsOnly = (number) => {
  const digits = (number + "").split("");  
  let i = 0;
  let twoAdjFound = false;
  while (i < digits.length-1) {
    if(digits[i] === digits[i+1]) twoAdjFound = true;
    if(twoAdjFound && (digits[i+1] === digits[i+2]) && (digits[i+2] !== digits[i+3])) return false;
    i++;
  }
  return twoAdjFound;
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
  let counter = 0;
  for (let currNum = rangeStart; currNum <= rangeEnd; currNum++) {
    if (meetsCriterion(currNum)) counter++;
  }

  return counter;
};

console.log(checkRange(147981, 691423));
