function multiplier(factor) {
  return (x) => x * factor;
}

let doubler = multiplier(2);

console.log(doubler);
console.log(doubler(2));
