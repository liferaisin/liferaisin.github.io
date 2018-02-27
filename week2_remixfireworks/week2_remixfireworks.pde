//Eva Serrano Reisner

//made more particles, changed them to squares, and changed it so that there's a range of particle sizes.
//also made an option down in the draw function in the class so that the outlines can blink black and white, or multiple colors.

ArrayList<FireworkParticle> fireworkArray = new ArrayList<FireworkParticle>();

void setup() {
  size(1500, 1500); 
  frameRate(60);
  
  int numFireworks = 700;
  PVector position = new PVector(random(width/3.0, (2.0/3.0) * width), random(0, height/2));
  color randomColor = color(random(255), random(255), random(255));
  
  for (int i = 0; i < numFireworks; i++) {
    fireworkArray.add(new FireworkParticle(position, randomColor));
  }
  
}

void draw() {
  background(0);
  for (int i = 0; i < fireworkArray.size(); i++) {
    FireworkParticle firework = fireworkArray.get(i);
    firework.update();
    firework.draw();
  }
}

class FireworkParticle {
  color fireworkColor;
  PVector position;
  PVector velocity;
  PVector acceleration;
  float alpha;
  float size;
  
  FireworkParticle(PVector position, color fireworkColor) {
    reset(position, fireworkColor);
  }
  
  void reset(PVector position, color fireworkColor) {
    this.position = new PVector(position.x, position.y);
    this.fireworkColor = fireworkColor;
    
    this.velocity = new PVector(random(-1.2, 1.2), random(-1, 1));
    this.acceleration = new PVector(0, random(0, 0.04));
    
    this.size = random(2,25);
    this.alpha= 255;
  }
  
  void update() {
    velocity.add(acceleration);
    position.add(velocity);
    
    alpha--;   
  }
  
  void draw() {
    //black and white squares
    stroke(random(255));
    //colorful squares
    //stroke(random(255), random(255), random(255));
    fill(fireworkColor, alpha);
    rect(position.x, position.y, size, size);
  }
}