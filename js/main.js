var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Kitty{

  constructor(){
    this.x = 50;
    this.y = 480;
    this.width = 99;
    this.height = 77;
    this.image = new Image();
    this.image.src = "./img/kitty.png";
  }

  // collision(item){
  //   return (this.x < item.x + item.width) &&
  //          (this.x + this.width > item.x) &&
  //          (this.y < item.y + item.height) &&
  //          (this.y + this.height > item.y);
  // }

  draw(){
    if(this.y < 490) this.y += 5;
        if(frames % 10 === 0 ) this.image;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}


class Office{

  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./img/Fondo.png";
  }

  draw(){
    
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }

}


var kitty = new Kitty();
var office = new Office();


var frames = 0;
var interval = setInterval(function(){
    frames++;
    office.draw();
    kitty.draw();
    
}, 1000/60);


addEventListener("keydown", function(e){
  if(e.keyCode === 32 && kitty.x <= canvas.width - kitty.width*4){
      kitty.y -= 100;
      kitty.x += kitty.width;
  }

  if(e.keyCode === 39 && kitty.x < canvas.width - kitty.width*4){
      office.x -= 20;
      kitty.x += 20;
      kitty.image.src = "./img/kitty.png";
}

  if(e.keyCode === 37 && kitty.x > 0){
    kitty.x -= 20;
    kitty.image.src = "./img/kitty_left.png";
}


  if(e.keyCode === 39 && kitty.x === canvas.width - kitty.width*4){
    office.x--;
  }

  if(kitty.x >= canvas.width - kitty.width*4){
    office.x -= 20;
  }

})