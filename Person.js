img = "";
sound = ""
objects = [];
status = "";

function preload(){
  img = loadImage('baby.webp');
  sound = loadSound('Sound.mp3');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  document.getElementById("finder").innerHTML = "Baby not found";
  sound.play();  
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0, 640, 420);

      if(status != "")
      {
        for (i = 0; i < objects.length; i++) {          
          if(objects.length == person){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("finder").innerHTML = "Baby found";
            sound.stop();
          }
          else if(objects.length < 0){
            document.getElementById("finder").innerHTML = "Baby not found";
            sound.play();
          }
          else{
            document.getElementById("finder").innerHTML = "Baby not found";
            sound.play();
          }          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}