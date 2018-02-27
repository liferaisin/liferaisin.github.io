// HOW TO PLAY - 
// Use "w" and "s" to move player one
// Use "up" and "down" key to move player two
// Click screen to start again! 
// Made by: Eva Serrano Reisner

//remix: everytime the ball is hit, everything changes color.
//also can press "p" to save picture.

float x, y, speedX, speedY;
float diam = 25;
float  rectSize = 200;
float posRight = 500;
float posLeft = 500;
int scoreRight = 0;
int scoreLeft = 0;
ArrayList < PVector > ball = new ArrayList < PVector >();



void setup() {
  background(0);
  fullScreen();
  fill(255);
  noStroke();
  reset();

}

void reset() {
  x = width/2;
  y = height/2;
  speedX = 10;
  speedY = 10;
  ball = new ArrayList < PVector >();
  scoreRight = 0;
  scoreLeft = 0;
}

void update() {


  //right side
  if (x > width-150 && x < width -100 && y > posRight-200 && y < posRight+200) {
    scoreRight +=1;
    speedX *= -1.1;
    fill(random(255), random(255), random(255));
  } 

  //left side
  if (x > 100 && x < 150 && y > posLeft-200 && y < posLeft+200) {
    speedX *= -1.1;
    speedY *= 1.1;
    scoreLeft += 1;
    fill(random(255), random(255), random(255));
  } 

  //vertical hitbox
  if (y > height || y < 0) {
    speedY *= -1;
  }
}
  
  
void draw() {
  update();
  background(0);
  ellipse(x, y, diam, diam);
  rect(125, posLeft, 20, rectSize);
  rect(width-150, posRight, 20, rectSize);
  textAlign(CENTER);
  textSize(125);
  text(scoreLeft, 400, 250);
  text(scoreRight, width-400, 250);
  
  x += speedX;
  y += speedY;
  ball.add(new PVector(x, y));
  for (int i = 0; i< ball.size(); i++) {
    ellipse(ball.get(i).x, ball.get(i). y, 25, 25);
  }


}

void keyPressed() {
  if (keyCode == UP) {
    posRight = posRight - 50;
  } else if (keyCode == DOWN) {
    posRight = posRight + 50;
  } else if (key  == 'w' || key == 'W') {
    posLeft = posLeft - 50;
  } else if (key == 's' ||key == 'S') {
    posLeft = posLeft + 50;
  } else if (key == 'p' || key == 'P'){
    saveFrame();
  }
}
void mousePressed() {
  reset();
}