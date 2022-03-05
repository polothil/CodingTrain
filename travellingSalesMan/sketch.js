let cities = [];
let totalCities = 5;

let recordDistance;
let bestEver;

function setup() {
  createCanvas(400, 300);
  for (let index = 0; index < totalCities; index++) {
    const v = createVector(random(width), random(height));
    cities[index] = v;
  }

  let d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for (let index = 0; index < cities.length; index++) {
    ellipse(cities[index].x, cities[index].y, 4, 4);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let index = 0; index < cities.length; index++) {
    vertex(cities[index].x, cities[index].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let index = 0; index < cities.length; index++) {
    vertex(bestEver[index].x, bestEver[index].y);
  }
  endShape();

  let i = floor(random(cities.length));
  let j = floor(random(cities.length));
  swap(cities, i, j);

  let d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
    console.log(recordDistance);
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  let sum = 0;
  let d = 0;
  for (let index = 0; index < points.length - 1; index++) {
    d = dist(points[index].x, points[index].y, points[index + 1].x, points[index + 1].y);
    sum += d;
  }
  return sum;
}
