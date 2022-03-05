// function setup() {
//   createCanvas(600, 400);
//   background(0);
//   let button = createButton('press');
//   button.mousePressed(() => background(random(255)));

//   // // Same function but old way
//   // function changeBackground() {
//   //   background(random(255));
//   // }
// }

// function draw() {
//   if (mouseIsPressed) {
//     fill(0);
//   } else {
//     fill(255);
//   }
//   ellipse(mouseX, mouseY, 80, 80);
// }

// --------------------------------------------------------------------------

function setup() {
  noCanvas();
  const counter1 = new Counter(100, 500);
}

// function draw() {
//   counter1.countIt();
// }

class Counter {
  constructor(start, wait) {
    this.count = start;
    // this.wait = time;
    this.p = createP('');
    setInterval(() => {
      this.count++;
      this.p.html(this.count);
    }, wait);
  }
}
