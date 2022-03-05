let rocket;
let lifespan = 400; // no.,of frames
let lifeP;
let count = 0;
let target;
let maxforce = 0.2;

let rx = 100;
let ry = 150;
let rw = 200;
let rh = 10;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);
  count++;
  if (count == lifespan) {
    // population = new Population();
    population.evaluate();
    population.selection();
    count = 0;
  }

  // Obstruction
  fill(255);
  rect(100, 150, 200, 10);

  ellipse(target.x, target.y, 16, 16);
}

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
  crossover(partner) {
    let newGenes = [];
    let mid = floor(random(this.genes.length));
    // console.log(this.genes.length, mid);
    for (let i = 0; i < this.genes.length; i++) {
      if (i > 0) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    return new DNA(newGenes);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}

class Rocket {
  constructor(dna) {
    this.position = createVector(width / 2, height);
    this.acceleration = createVector();
    this.velocity = createVector();
    this.velocity.limit(4);
    this.completed = false;
    this.crashed = false;
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.fitness = 0;
  }

  calcFitness() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0); //Alternative to (1 / d)
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 1;
    }
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.position = target.copy();
      // console.log('Finished!');
    }

    // if crashed on to the Obstruction
    if (
      this.position.x > rx &&
      this.position.x < rx + rw &&
      this.position.y > ry &&
      this.position.y < ry + rh
    ) {
      this.crashed = true;
    }

    // if crashed on the edge of canvas
    if (this.position.x > width || this.position.x < 0) {
      this.crashed = true;
    }

    if (this.position.y > height) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  display() {
    //background(255,0,0);
    push();
    noStroke();
    fill(255, 150);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());

    // Thrusters
    rectMode(CENTER);
    rect(0, 0, 30, 5);

    pop();
  }
}

class Population {
  constructor() {
    this.rockets = [];
    this.popSize = 20;
    this.matingpool = [];

    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i] = new Rocket();
    }
  }

  evaluate() {
    let maxfit = 0;
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    // console.log(this.rockets);

    // Normalizing fitness values
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];

    //
    for (let i = 0; i < this.popSize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  selection() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingpool).dna; //P5 feature to pick random
      let parentB = random(this.matingpool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  run() {
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].display();
    }
  }
}
