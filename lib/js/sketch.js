var video;
var vScale = 16;
var particles = [];
var triangles = [];
var click = false;
var count = 0;
var canvas;
var portraitButton;
var save;
var again;
var countMax = 180;

function setup() {
  canvas = createCanvas(960,700);
  canvas.parent('canvas');
  pixelDensity(2);
  portraitButton = createButton('🎨 paint my portrait  ');
  portraitButton.parent('sketch-holder');
  portraitButton.position(440, 700/2);
  portraitButton.mousePressed(clickToggle);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  video.loadPixels();
  video.hide();
  for (var i = 0; i < 150; i++) {
    particles[i]  = new Particle(450,700/2);
  }
//
}

function draw() {
  video.loadPixels();
  if (click && count < 1) {
    triagleBackground();
  }

  if (click && count <= countMax) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
    count++;
  }

  if (count === countMax) {
    save = createButton('⬇️ save my portrait');
    save.parent('sketch-holder');
    save.style('minWidth', '150px');
    save.position(420, 600);
    save.mousePressed(savePic);
    again = createButton('🎨 paint me again');
    again.parent('sketch-holder');
    again.style('minWidth', '150px');
    again.position(420, 640);
    again.mousePressed(paintAgain);
  }

  //filter(INVERT);
}

function triagleBackground() {
  for (var j = 0; j < 20; j++) {
    var tri = {
      x1: (width/2) + random(200) -100,
      y1: height/2 + random(200) -100,
      x2: random(width * 2),
      y2: random(height * 2),
      x3: random(-width * 2),
      y3: random(-height * 2),
    };
    triangles.push(tri);
  }

  triangles.forEach(function(shape){
    fill(random(255));
    //strokeWeight(random(50)/100); // range
    noStroke();
    triangle(shape.x1,shape.y1,shape.x2,shape.y2,shape.x3,shape.y3);
  });
}
function clickToggle() {
  click = true;
  count = 0;
  portraitButton.remove();
}

function savePic() {
  saveCanvas(canvas, 'portraitOfYou_by_DMR', 'jpg');
}

function paintAgain() {
  count = 0;
  again.remove();
  save.remove();
}