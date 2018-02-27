
let red;
let blue;
let yellow;

function setup() {
  createCanvas(500, 500);
  background(0);
  red = new Square(100, 255, 0, 0);
  yellow = new Square(200, 255, 255, 0);
  blue = new Square(300, 0, 0, 255);
}

function draw() {
  red.display();
  yellow.display();
  blue.display();
}

class Square {
  constructor(position, r, g, b) {
    this.position = position;
    this.color = color(r, g, b);
    this.size = 100;
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.position, this.position, this.size, this.size);
  }

}
