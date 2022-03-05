// https://youtu.be/qmnH5MT_luk

let vals = [2, 8, 1, 7, 9, 3];

let doubled = vals.map((val) => val * 2);
console.log(`vals : ${vals}`);
console.log(`doubled : ${doubled}`);

let sum = 10;
for (let val of vals) {
  sum += val;
}
console.log(`sum : ${sum}`);

let sumUsingReduce = vals.reduce((acc, val) => acc + val, 10);
console.log(`sumUsingReduce : ${sumUsingReduce}`);

let arrayMaxUsingReduce = vals.reduce((acc, val) => (val > acc ? val : acc));
console.log(`arrayMaxUsingReduce : ${arrayMaxUsingReduce}`);

let filteredEvenArray = vals.filter((val) => !(val % 2));
console.log(`filteredEvenArray : ${filteredEvenArray}`);

let filteredOddArray = vals.filter((val) => val % 2);
console.log(`filteredOddArray : ${filteredOddArray}`);

let strArray = ['abc', 'bca', 'cab', 'cba', 'bac', 'acb'];

console.log(strArray.sort());
