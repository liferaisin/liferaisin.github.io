var rick;
// let number = 2;
function preload() {
  var url =
   'https://rickandmortyapi.com/api/character';
  rick = loadJSON(url);
}

function setup() {
  createCanvas(500, 500);
  var url =
   'https://rickandmortyapi.com/api/character' + '/?page2';
  loadJSON(url, randomChar);
}

function draw() {
  background(200);
}

function randomChar(rick) {
  let charname = results["name"];
  textAlign(CENTER);
  text(charname, 0, height - 30, width, 30);
}
