var Particle = function(x,y) {
  this.x = x;
  this.y = y;
  this.r = random(1,20);
};

Particle.prototype.update = function() {
  this.x += random(-50,50);
  this.y += random(-50,50);
  this.x = constrain(this.x,0, width);
  this.y = constrain(this.y,0, height);
};

Particle.prototype.show = function() {
    strokeWeight(1);
    stroke(0,random(20));
    var px = floor(this.x / vScale);
    var py = floor(this.y / vScale);
    var col = video.get(px,py);
    fill(col[0], col[1], col[2], random(100,200));
    if (frameCount%7 === 0) {
      ellipse(this.x,this.y,this.r + random(5),this.r + random(5));
    }
    else if (frameCount%17 === 0) {
      rotate(random(360));
        triangle(this.x,this.y, (this.x + this.r), (this.y - this.r), (this.x - this.r), (this.y - this.r));
      }
    else {
      for (var i = 0; i < 10; i++) {
        stroke(col[0], col[1], col[2], random(100,150));
        strokeWeight(random(10));
        line(this.x,this.y,this.x+random(-10,10),this.y+random(-10,10));
      }
    }




    //ellipse(this.x,this.y,this.r,this.r);
};