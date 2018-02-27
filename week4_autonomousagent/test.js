ArrayList<Vehicle> vehicles;

function setup() {
  size(320,240);
  vehicles = new ArrayList<Vehicle>();
  for (let i = 0; i < 100; i++) {
    vehicles.add(new Vehicle(random(width),random(height)));
  }
}

function draw() {
  background(255);

  for (Vehicle v : vehicles) {
    v.separate(vehicles);
    v.update();
    v.display();
  }
}



function separate (ArrayList<Vehicle> vehicles) {
  let desiredseparation = 20;
  PVector sum = new PVector();
  let count = 0;
  for (Vehicle other : vehicles) {
    let d = PVector.dist(location, other.location);
    if ((d > 0) && (d < desiredseparation)) {
      PVector diff = PVector.sub(location, other.location);
      diff.normalize();
      sum.add(diff);
      count++;
    }
  }
  if (count > 0) {
   sum.div(count);
   sum.setMag(maxspeed);
    PVector steer = PVector.sub(sum,vel);
    steer.limit(maxforce);
    applyForce(steer);
  }
}
