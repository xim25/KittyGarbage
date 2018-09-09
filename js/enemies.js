var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Apple{

  constructor(){
    this.x = ;
    this.y = ;
    this.width = 20;
    this.height = 20;
    this.image = new Image();
    this.image.src = "../img/enemy1.gif";
  }

  draw(){
    if(this.y < ) this.y += 5;
        if(frames % 10 === 0 ) this.image;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}