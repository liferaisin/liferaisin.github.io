// Eva Serrano Reisner
// 02/26/18
// derek the chicken game.
// based of something that i made in gamemaker in high school
// and then attempted to transfer to processing last semester.
// sprites are mine, backgrounds are from BitDay wallpaper
// ran into trouble with displaying any images, but in theory this would work
// CORS policy blocked them :( even my sprites

let left;
let right;
let up;
let down;
let gravity = .2;
let ground = 820;

let xpos =15;
let ypos =760;
let x=1;

let expos = 900;
let eypos = 850;

let score = 0;
let lives = 1;

let sceneStates = Object.freeze({
  TITLE: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE: 4
});

let currentState = sceneStates.TITLE;

//image variables
let back1;
let back2;
let back3;
let back6;
let back7;
let weaselpic;

let derekSprite;
let eggSprite;

let mouseOn = false;
let tutorialTimer;

let gameTimer;
let gameTimePressed;
const timeForGame = 5000;

function setup() {
  createCanvas(1920, 1080);
  weaselpic = loadImage("weasel.png");
  back1 = loadImage("1.png");
  back2 = loadImage("data/2.png");
  back3 = loadImage("data/3.png");
  back6 = loadImage("data/6.png");
  back7 = loadImage("data/7.png");

  chicken = new Sprite();
  chicken.derekShape = loadImage("derek.png");
  chicken.position = createVector(400, ground);
  chicken.direction = 1;
  chicken.velocity = createVector(0, 0);
  chicken.jumpSpeed = 10;
  chicken.walkSpeed = 4;

}

function draw() {
  drawScene();
  checkTransition();
  keyOn = false;
}

function drawScene() {
  switch(currentState) {
    case sceneStates.TITLE:
      background(back1);
      background(255);
      fill(582, 36, 0);
      textSize(75);
      textAlign(CENTER, CENTER);
      text("Derek the Chicken", width/2, 400);
      textSize(35);
      text("Click to begin", width/2, 600);
      break;
    case sceneStates.TUTORIAL:
      background(back2);
      background(255);
      textSize(35);
      textAlign(CENTER, CENTER);
      text("to move, use A and D.", width/2, 200);
      text("to jump, press space.", width/2, 300);
      text("Collect the egg and\navoid the weasel!", width/2, 500);
      if(millis() > tutorialTimer + 3000){ // 3000 is 3 seconds; that's the time for the tutorial to appear
        text("Click to begin", width/2, 800);
      }
      break;
    case sceneStates.GAME:
      background(back3);
      background(255);

      updateChicken();
      weasel = new Enemy("weasel.png",35,700);
      weasel.start();
      egg1 = new Egg("eggu.png",100,700);
      egg1.spawn();
      if(chicken.position.x > 845 && chicken.position.x<900 && chicken.position.y<950 && chicken.position.y > 700 && currentState.GAME){
        lives = 0;
      }
      if(chicken.position.x > 1200 && chicken.position.x<1270 && chicken.position.y<950 && chicken.position.y > 700 && currentState.GAME){
        score = 1;
      }
      break;
    case sceneStates.WIN:
      background(six);
      background(255);
      fill(0);
      textSize(35);
      textAlign(CENTER, CENTER);
      text("YOU WON!", width/2, 500);
      text("Click to return to title", width/2, 500);
      break;
    case sceneStates.LOSE:
      background(seven);
      background(255);
      fill(255);
      textSize(35);
      textAlign(CENTER, CENTER);
      text("sorry, you died", width/2, 300);
      text("Click to try again", width/2, 500);
  }
}

function checkTransition() {
  switch (currentState) {
    case sceneStates.TITLE:
      if(mouseOn) {
        currentState++;
        setupScene();
      }
      break;
    case sceneStates.TUTORIAL:
      if(millis() > tutorialTimer + 3000) {
        if (mouseOn) {
          currentState++;
          setupScene(currentState);
        }
      }
      break;
    case sceneStates.GAME:
      if(score === 1){
        currentState++;
      }
      if( lives === 0) {
        currentState.LOSE;
      }
      break;
    case sceneStates.WIN:
      if(mouseOn) {
        currentState = sceneStates.TITLE;
        setupScene();
      }
      break;
    case sceneStates.LOSE:
      if(mouseOn) {
        currentState = sceneStates.GAME;
        setupScene();
      }
      break;
  }
}

function setupScene() {
  switch(currentState) {
    case sceneStates.TITLE:
      break;
    case sceneStates.TUTORIAL:
      tutorialTimer = millis();
      break;
    case sceneStates.GAME:
      gameTimer = millis();
      break;
  }
}

class Egg{
  let eggImage;

  Egg(this.eggy, this.spawnX, this.spawnY){
    eggImage = loadImage(eggy);
  }
  function spawn(){
    image(eggImage, spawnX, spawnY);
  }
}

class Enemy{
  let weaselImage;

  Enemy(this.picture, this.expos, this.eypos){
    weaselImage = loadImage(picture);
  }
  function start(){
    image(weaselImage, expos, eypos);
  }
}

class Sprite{
  let derekShape;
  let position;
  let direction;
  let velocity;
  let jumpSpeed;
  let walkSpeed;

  function display(){
    image(derekShape, xpos, ypos);
  }

  function moveY(){
    ypos = ypos-1;
  }
}

function updateChicken()
{
  if (chicken.position.y < ground){
    chicken.velocity.y += gravity;
  }
  else{
    chicken.velocity.y = 0;
  }

  if (chicken.position.y >= ground && up != 0){
    chicken.velocity.y = -chicken.jumpSpeed;
  }

  chicken.velocity.x = chicken.walkSpeed * (left + right);

  let nextPosition = createVector(chicken.position.x, chicken.position.y);
  nextPosition.add(chicken.velocity);

  let offset = 0;
  if (nextPosition.x > offset && nextPosition.x < (width - offset)){
    chicken.position.x = nextPosition.x;
  }
  if (nextPosition.y > offset && nextPosition.y < (height - offset)){
    chicken.position.y = nextPosition.y;
  }


  pushMatrix();

  translate(chicken.position.x, chicken.position.y);

  scale(chicken.direction, 1);

  imageMode(CENTER);
  image(chicken.derekShape, 0, 0);

  popMatrix();
}

function mousePressed() {
  mouseOn = true;
}

function keyPressed(){
  if (key == 'd'){
    right = 1;
    chicken.direction = -1;
  }
  if (key == 'a'){
    left = -1;
    chicken.direction = 1;
  }
  if (key == ' '){
    up = -1;
  }
  if (key == 's'){
    down = 1;
  }
}

function keyReleased(){
  if (key == 'd'){
    right = 0;
  }
  if (key == 'a'){
    left = 0;
  }
  if (key == ' '){
    up = 0;
  }
  if (key == 's'){
    down = 0;
  }
}
