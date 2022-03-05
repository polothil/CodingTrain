let cities = [];
let totalCities = 6;

let order = [];

let totalPermutations;
let count = 1;

let recordDistance;
let bestEver;

function setup() {
  createCanvas(400, 600);
  for (let i = 0; i < totalCities; i++) {
    const v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  let d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);
  console.log(totalPermutations);
}

function draw() {
  background(0);
  // frameRate(1);
  fill(255);
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10, 10);
    textSize(20);
    text(i, cities[i].x, cities[i].y);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  let d = calcDistance(cities, order);
  // console.log(order, d);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
    console.log('record: ', recordDistance);
    console.log(order);
  }

  textSize(32);
  let s = '';
  for (let i = 0; i < order.length; i++) {
    s += order[i];
  }
  fill(255);
  let percent = (100 * count) / totalPermutations;
  text(nf(percent, 0, 2) + '% Completed', 20, height / 2 - 50);
  text(s, 20, height / 2 - 20);

  nextOrder();
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  let sum = 0;
  let d = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityA = points[order[i]];
    let cityB = points[order[i + 1]];
    d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// This is my lexical order algorithm

function nextOrder() {
  count++;

  let largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop(); //P5
    console.log('Finished!', bestEver, recordDistance);
  }

  let largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ);

  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
