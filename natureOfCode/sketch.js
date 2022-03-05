// let xoff1 = 0;
// let xoff2 = 10000;
let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(600, 400);
  background(0);
}

function draw() {
  background(51);
  stroke(255);
  noFill();
  beginShape();
  let xoff = start;

  for (let x = 0; x < width; x++) {
    stroke(255);
    // let y = random(height);
    let y = noise(xoff) * height;
    vertex(x, y);

    xoff += inc;
  }
  endShape();
  start += inc;

  // noLoop();

  // let x = random(width);
  // let x = map(noise(xoff1), 0, 1, 0, width);
  // let y = map(noise(xoff2), 0, 1, 0, width);

  // xoff1 += 0.02;
  // xoff2 += 0.02;

  // ellipse(x, y, 24, 24);
}
