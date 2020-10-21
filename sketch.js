var PLAY =1;
var END  =0;
var gameState=PLAY;
var survivalTime=0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-6
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background(180);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalTime,100,50);
  
if(gameState==PLAY){
   
  survivalTime=Math.round(frameCount/20);
  
  ground.x=ground.width/2;
  
  if(keyDown("space")&& monkey.y >=250) {
       monkey.velocityY = -12;
  }
   
  monkey.velocityY=monkey.velocityY+0.8                         
  monkey.collide(ground)
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach()
}
    
    if(monkey.isTouching(obstacleGroup)){
    gameState=END
    bananaGroup.destroyEach();
}
    spawnBananas();
  
    spawnObstacles();
}
else if(gameState==END){
      ground.velocityX = 0;
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);

     bananaGroup.destroyEach();
  
     monkey.velocityX=0
     monkey.collide(ground)
  
     
}
  
     console.log(frameCount)
  
     drawSprites();
  
}

function spawnBananas(){
 
   if (frameCount % 80 === 0) {
    banana = createSprite(400,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 134;
    bananaGroup.add(banana);
    }
}



function spawnObstacles(){
if (frameCount %300 === 0){
   var obstacle = createSprite(300,330,10,10);
   obstacle.addImage(obstacleImage)
   obstacle.velocityX = -6;         
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;

   obstacleGroup.add(obstacle);
 }
 }

