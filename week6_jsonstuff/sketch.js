// Eva Serrano Reisner
// 3.5.18

// I ACTUALLY SUCCEEDED IN WHAT I WANTED TO DO
// used the Rick and Morty API to make a random character generator
// I know that's like super simple sorry, but it was weird trying to figure out
// the exact wording needed in different APIs
// I was gonna do pokemon, but I couldn't even figure out
// how to get the JSON from that one.
// so overall even though this is small and silly I'm  happy haha

var rick;
let picker;
let pick;

function preload() {
  picker = random(394);
  pick = picker.toFixed(0);
  var url =
   'https://rickandmortyapi.com/api/character/' + pick;
  rick = loadJSON(url);
}

function setup() {
  noLoop();
  createCanvas(500, 500);
  picker = random(394);
  pick = picker.toFixed(0);
  var url =
   'https://rickandmortyapi.com/api/character/' + pick;
  loadJSON(url, randomChar);
}

function draw() {
  background(random(255), random(255), random(255));
  console.log(pick);
  textAlign(CENTER, CENTER);
  // text("today you are " + charname, 0, height/2, width, 30);
}

function randomChar(rick) {
  let charname = rick.name;
  textSize(20);
  textAlign(CENTER, CENTER);
  text("today you are " + charname, height/2, width/2);
}
