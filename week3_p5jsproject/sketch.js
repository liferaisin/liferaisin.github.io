// Eva Serrano Reisner
// 02/12/18
// class of dogs that move and bark


var fido;
var max;

function setup() {
  createCanvas(1200,800);
  fido = new GoodBoy();
  max = new GoodBoy();
}

function draw() {
  background(0);
  fido.display();
  fido.bork();
  fido.down();
  max.display();
  max.up();
}

function GoodBoy() {
  this.furColor = random(255);
  this.dogWidth = random(5, 500);
  this.dogHeight = random(5, 500);
  this.position = random(0, 800);

  this.display = function() {
    noStroke();
    fill(this.furColor);
    rect(this.position, this.position, this.dogWidth, this.dogHeight);
  }

  this.down = function() {
    this.position ++;
  }

  this.up = function() {
    this.position --;
  }

  this.bork = function() {
    if(mouseIsPressed) {
      console.log("bork");
    }
  }
}
