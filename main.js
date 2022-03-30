img = "";
status = "";
objects = [];

function preload() {
  img = loadImage("road.jpg");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);

  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResults);
    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Dtected";
      document.getElementById("number_of_objects").innerHTML =
        "Number of objects detected are :" + objects.length;
      fill(r, g, b);
      textSize(22);
      percent = floor(objects[i].confidence * 100);
      text(
        objects[i].label + "  " + percent + "%",
        objects[i].x + 15,
        objects[i].y + 25
      );
      noFill();
      stroke(r, g, b);
      strokeWeight(3);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
