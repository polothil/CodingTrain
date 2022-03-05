let cities = [];
let totalCities = 10;

let popSize = 300;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;

let statusP;

function setup() {
  createCanvas(400, 600);
  let order = [];
  for (let i = 0; i < totalCities; i++) {
    const v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order); //copying to new array
  }

  statusP = createP('').style('font-size', '32');
}

function draw() {
  background(0);

  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  // frameRate(1);
  fill(255);
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10, 10);
    text(i, cities[i].x + 10, cities[i].y);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
}

// function shuffle(a, num) {
//   for (let i = 0; i < num; i++) {
//     let indexA = floor(random(a.length));
//     let indexB = floor(random(a.length));
//     swap(a, indexA, indexB);
//   }
// }

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
