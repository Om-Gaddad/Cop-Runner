var cop, copImage, copDead;
var car, carImage, carGroup;
var back, backImage;
var invisibleGround;
var gameState = "play";
var restart, restartImage;
var score = 0;


function preload(){
  
  copImage = loadAnimation("cop_frame_1.png", "cop_frame_2.png");
  copDead = loadAnimation("cop_dead.png");
  carImage = loadImage("car.png");
  backImage = loadImage("background.png");
  restartImage = loadImage("restart.png")
  
  
}

function setup(){
  createCanvas(700,600)
  
  back = createSprite(350,300,700,600);
  back.addImage("Background", backImage);
  back.velocityX = -5;
  back.x = back.width/2
  
  cop = createSprite(100,525,10,40)
  cop.addAnimation("Cop/Player", copImage);
  cop.addAnimation("Dead_Cop", copDead);
  cop.scale = 0.3;
  cop.setCollider("circle",-75,0,200);
 // cop.debug = true;
  
  invisibleGround = createSprite(350,575,700,10);
  
  restart = createSprite(350,300,10,10);
  restart.addImage("Restart", restartImage);
  restart.scale = 0.1;
  restart.visible = false;
  
  carGroup = new Group();
  
  
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    
  score = score + Math.round(getFrameRate()/60);
    
    if(back.x < 200){
    back.x = 400;
  }  
  
  cop.velocityY = cop.velocityY + 0.6
  
  if(keyDown("Space")){
    cop.velocityY = -13;
  }
    
  spawnCar();
    

    if(carGroup.isTouching(cop)){
      gameState = "end";
    }
    
  }
  else if (gameState === "end"){
    back.velocityX = 0;
    cop.changeAnimation("Dead_Cop", copDead);
    carGroup.setVelocityXEach(0);
    carGroup.setLifetimeEach(-1);
    restart.visible = true;
    score = 0;   
  }
  
  if(mousePressedOver(restart) && gameState === "end") {
      restartStart();
    } 

  
  cop.collide(invisibleGround);

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 315, 75);
}

function restartStart(){
  gameState = "play";
  carGroup.destroyEach();
  cop.changeAnimation("Cop/Player", copImage);
  restart.visible = false;
}

function spawnCar(){
  if(frameCount % 150 === 0){
    car = createSprite(800,500,10,70)
    car.velocityX = -5;
    car.addImage("Car", carImage);
    car.scale = 0.4;
    //car.debug = true;
    car.setCollider("circle",0,0,200)
    carGroup.add(car);
    car.lifetime = 200;
  }
  
}

