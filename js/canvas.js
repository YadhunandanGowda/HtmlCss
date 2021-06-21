let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-6;
let maxRadius = 30;

let c = canvas.getContext("2d");
//rect
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(0, 0, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(200, 200, 100, 100);

// //line
// c.beginPath();
// c.moveTo(150, 50);
// c.lineTo(350,50);
// c.lineTo(350,350);
// c.strokeStyle = "rgba(0,0,255,0.5)";
// c.stroke();

//arc/circle
// c.beginPath()
// c.arc(400,400,50,0,10);
// c.strokeStyle = "rgba(0,255,0,0.5)";
// c.stroke();

// for(i=0;i<100;i++){
//     let xCo =  Math.floor(Math.random()*((window.innerWidth-50)-50+1))+50 ;
//     let yCo = Math.floor(Math.random()*((window.innerHeight-50)-50+1))+50;
//     let colors = ["blue","red","green","yellow","orange","pink","gray","violet"];
//     c.beginPath()
// c.arc(xCo,yCo,50,0,10);
// c.strokeStyle = colors[Math.floor(Math.random()*(colors.length+1))];
// c.stroke();
// }

function Circle(x,y,dx,dy,radius,sc){
    this.x = x;
    this.y = y;
    this.dx = (dx == 0)?1:dx;
    this.dy = (dy == 0)?1:dy;
    this.radius = this.minRadius = radius;
    this.sc = sc;
    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,20);
        c.strokeStyle = this.sc;
        c.fillStyle = this.sc;
        c.fill()
        c.stroke();
        this.update();
    }
    this.update = function(){
        if(this.x +30 > window.innerWidth || this.x-30< 0) {
            this.dx = -this.dx;
        }
        if(this.y +30 > window.innerHeight || this.y-30< 0) {
            this.dy = -this.dy;
        }
          if(mouse.x-this.x <50 && mouse.x-this.x >-50 && mouse.y-this.y <50 && mouse.y-this.y >-50 && this.radius <maxRadius){
              this.radius +=1;
          }else if(this.radius >this.minRadius){
            this.radius -=1;
          }
        this.y+=this.dy;
        this.x+=this.dx;
    }
}

  let mouse = {x:undefined, y:undefined};

  window.addEventListener("mousemove", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
  })
  
  window.addEventListener("resize", function(e){
    canvas.width = window.innerWidth-5;
    canvas.height = window.innerHeight-6;
  })

let circleArray = []
for(i=0;i<1000;i++){
    let colors = ["blue","red","green","yellow","orange","pink","gray","violet"];
    let sc = colors[Math.floor(Math.random() * colors.length)] ;
    let radius = Math.floor(Math.random()*(5));
    let x = Math.floor(Math.random()*((window.innerWidth-radius)-radius+1))+radius;
    let y=Math.floor(Math.random()*((window.innerHeight-radius)-radius+1))+radius;;
    let dx = Math.floor(Math.random()*((2)-(-2)))-2;
    let dy = Math.floor(Math.random()*((2)-(-2)))-2;
    circleArray.push(new Circle(x,y,dx,dy,radius,sc));
}

console.log(circleArray)

function animate(){ 
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth-5,window.innerHeight-6);
    for(y=0;y<circleArray.length;y++){
        circleArray[y].draw();
    }
}

animate()

'use strict'
console.clear();
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor2');

let smallSpeed = 0.2;
let largeSpeed = 0.12;

let data = {
  x: 0.,
  y: 0.,
  largeX: 0,
  largeY: 0,
  targetX: 0,
  targetY: 0,
}


document.addEventListener('mousemove', e => {
  data.targetX = e.pageX;
  data.targetY = e.pageY;
});

const applyStyles = ()=>{
  cursor.style.transform = 
    `translate(${data.x - 5}px, ${data.y - 5}px) `
  cursorFollower.style.transform = 
    `translate(${data.largeX - 25}px, ${data.largeY - 25}px)`
}

const tick = ()=>{
  // Get distance to Target => targetX - x
  // Get 10% of that distance => ^^^ * smallSpeed
  // Add it to the circle => data.x += ^^^ 
  data.x += (data.targetX - data.x) * smallSpeed;
  // Repeat your Y-coord
  data.y += (data.targetY - data.y) * smallSpeed;
  
  data.largeX += (data.targetX - data.largeX) * largeSpeed;
  data.largeY += (data.targetY - data.largeY) * largeSpeed;
  
  applyStyles()
  requestAnimationFrame(tick);
}
tick();