// Pick an item from a list based on its probability score without creating any extra array

const fruits = [
  { name: 'mango', score: 1 },
  { name: 'blueberry', score: 3 },
  { name: 'cherry', score: 1 },
  // { name: 'melon', score: 7 },
  { name: 'apple', score: 5 },
];

// Normalizing
let sum = 0;
for (let i = 0; i < fruits.length; i++) {
  sum += fruits[i].score;
}
console.log('sum: ', sum);
for (let i = 0; i < fruits.length; i++) {
  fruits[i].prob = fruits[i].score / sum;
  fruits[i].count = 0;
}
console.log(fruits);

for (let i = 0; i < 10; i++) {
  let fruit = pickOne(fruits);
  fruit.count++;
  console.log(fruits);
}

function pickOne(list) {
  let index = 0;
  let r = Math.random(1);

  while (r > 0) {
    console.log(r, index, list[index].prob);
    r = r - list[index].prob;
    console.log(r);
    index++;
  }
  index--;
  return list[index];
}
