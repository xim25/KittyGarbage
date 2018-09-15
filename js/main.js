//Variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



var frames = 0;
var score = [];

var garbage = { 
  apple: './img/apple.png',
  banana: './img/banana.png',
  chicken: './img/chicken.png',
  bottle: './img/bottle.png',
  cup: './img/cup.png',
  box: './img/box.png'
};

// var enemies = {
//   dog: './img/dog.png',
//   cucumber: './img/cucumber.png',
//   ice: './img/ice.png',
//   shower: './img/shower.png',
// }

var audios = {
  back: './audio/back.mp3',
  win: './audio/winner.mp3',
};

var audioBack = new Audio();
audioBack.src = audios.back;
audioBack.loop = true; 

var audioWin = new Audio();
audioWin.src = audios.win;
audioWin.loop = false; 


//Classes 
class Office{

  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./img/Fondo.png";
    this.score = 0;
    }
  

  draw(){
    this.x--;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,60);
        ctx.globalAlpha = 1.0;
        ctx.font = '20px basis-grotesque-mono';
        ctx.fillStyle = 'white';
        ctx.fillText(`Time: ${Math.round(frames/60)}`, 50, 37);
        ctx.fillText('Score: '+ this.score, 200, 37);
        ctx.fillText('Lives: '+ kitty.deadliItems, 500, 37); 
        
  }
}

class Kitty{

  constructor(){
    this.x = 50;
    this.y = 480;
    this.width = 99;
    this.height = 77;
    this.image = new Image();
    this.image.src = "./img/kitty.png";
    this.deadliItems = 3;
  }

  collision(item){
    return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
}

  draw(){
        if(this.y < 490) this.y += 4;
        if(frames % 10 === 0 ) this.image;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Apple{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = 57;
    this.image = new Image();
    this.image.src = garbage.apple;
    this.type = "organic";
  }

  draw(){
    if(frames % 10 === 0) this.x -= 15;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Banana{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 75.5;
    this.height = 62;
    this.image = new Image();
    this.image.src = garbage.banana;
    this.type = "organic";
  }

  draw(){
    if(frames % 10 === 0) this.x -= 15;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


class Chicken{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.image = new Image();
    this.image.src = garbage.chicken;
    this.type = "organic";
  }

  draw(){
    if(frames % 10 === 0) this.x -= 15;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}




class Bottle{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 27;
    this.height = 80;
    this.image = new Image();
    this.image.src = garbage.bottle;
    this.type = "inorganic";
  }

  draw(){
    if(frames % 10 === 0) this.x -= 25;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


class Cup{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = 55;
    this.image = new Image();
    this.image.src = garbage.cup;
    this.type = "inorganic"
  }

  draw(){
    if(frames % 10 === 0) this.x -= 25;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Box{

  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 62;
    this.height = 96.5;
    this.image = new Image();
    this.image.src = garbage.box;
    this.type = "inorganic";
  }

  draw(){
    if(frames % 10 === 0) this.x -= 25;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


var office = new Office();
var kitty = new Kitty();


var interval = setInterval(function(){
    frames++;
    office.draw();
    kitty.draw();
    generateElements();
    drawElements();
    gotKitten();
}, 1000/60);


//Functions

var elements = [];

var items = ["apple", "bottle", "banana", "chicken", "cup", "box"];

function generateElements(){
  if(frames % 50 === 0 || frames % 500 === 0 || frames % 1000 === 0){
    let altura = Math.floor((Math.random() *  400) + 100 );
    let type = items[Math.floor((Math.random() * 6))]
    let item;

    switch (type) {
      case "apple":
        item = new Apple(altura);
        break;

      case "bottle":
        item = new Bottle(altura);
        break

      case "banana":
        item = new Banana(altura);
        break

      case "chicken":
        item = new Chicken(altura);
        break

      case "cup":
        item = new Cup(altura);
        break

      case "box":
        item = new Box(altura);
        break

    
      default:
        return;

    }
    elements.push(item);
  }
}


function drawElements(){
  elements.forEach(function(elem, index){
      
      if(kitty.collision(elem)){
        if(elem.type === "organic") office.score += 55.5;
        if(elem.type === "inorganic"){
          if(kitty.deadliItems <= 1) clearInterval(interval);
          kitty.deadliItems -= 1;
          office.draw();
        }
        elements.splice(index, 1);
      };
          elem.draw();
      })
}

function gotKitten(){
  if(office.score == 555){
    audioBack.pause();
    clearInterval(interval);
    audioWin.play();
    ctx.font = '100px basis-grotesque-mono';
    ctx.fillStyle = 'white';
    ctx.fillText("Winner!", 230, 250);
    
  }
}


//Events

addEventListener("keydown", function(e){
  // if(e.keyCode === 32 && kitty.y >= 200){
  //     kitty.y -= 150;
  //     // if(kitty.x <= canvas.width - kitty.width*4) kitty.x += kitty.width;
  // }

if(e.keyCode === 38 && kitty.y >= 200){
  kitty.y -= 75;
  // if(kitty.x <= canvas.width - kitty.width*4) kitty.x += kitty.width;
}
  

if(e.keyCode === 40 && kitty.y >= 480){
  kitty.y += 75;
  // if(kitty.x <= canvas.width - kitty.width*4) kitty.x += kitty.width;
}

if(e.keyCode === 83){
  audioBack.play();
}

if(e.keyCode === 87){
  audioBack.pause();
  audioWin.play();
}

})