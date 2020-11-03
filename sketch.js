var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage;
var obstacle,o1,o2,o3,o4,o5,o6;
var score=0;
var cloudgr,obsgr;
var gamestate="play"
var gameover,restart;
var gameoverimage,restartimage;
var jumpsound,scoresound,diesound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png",      "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudimage= loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  gameoverimage=loadImage("gameover.png");
  restartimage=loadImage("restart.png")
  diesound=loadSound("die.mp3");
  jumpsound = loadSound("jump.mp3");
  scoresound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  //create a trex sprite
  trex = createSprite(50,160,20,30);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle",0,0,40);
  

  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgr=new Group();
  obsgr=new Group();
  
  gameover = createSprite(300,80,10,20);
  gameover.addImage(gameoverimage);
  
  restart =  createSprite(300,120,10,20); 
  restart.addImage(restartimage);
  restart.scale=0.5
  
}

function draw() {
  background("white");
  //console.log(frameCount);
  
  text("score " +score,500,50)
  //jump when the space button is pressed
  
  if(gamestate==="play"){
   clouds();
   obstacles();
   score=score+Math.round(getFrameRate()/60); 
   ground.velocityX = -4-Math.round(score/100);
   if (keyDown("space")&&trex.y>161) {
    trex.velocityY = -10;
     jumpsound.play();
  }

  trex.velocityY = trex.velocityY + 0.5
  gameover.visible=false;
  restart.visible=false;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if(obsgr.isTouching(trex)){ 
    gamestate="end"
    diesound.play();
  }
  if(score>0&&score%100===0){
   scoresound.play(); 
  }
 }
  else if(gamestate==="end"){
    obsgr.setVelocityXEach(0);
    cloudgr.setVelocityXEach(0);
    ground.velocityX=0;
    cloudgr.setLifetimeEach(-1);
    obsgr.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    gameover.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)||keyDown("space")){
      Restart();
    }
}
    
  
  trex.collide(invisibleGround);
  drawSprites();
}
function clouds(){
 if(frameCount%50===0){
  cloud = createSprite(600,50,20,10);
  cloud.velocityX=-5-Math.round(score/100);
  cloud.addImage(cloudimage);
  cloud.scale=1;
  cloud.y=Math.round(random(20,60));
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=130;
  cloudgr.add(cloud);
}}
function obstacles(){
 if(frameCount%80===0){
  obstacle=createSprite(600,160,20,50);
  obstacle.velocityX=-5-Math.round(score/100);
  var obs=Math.round(random(1,6));
  obstacle.lifetime=130
  switch(obs){
    case 1:obstacle.addImage(o1) ;
    obstacle.scale=0.7;
    break 
    case 2:obstacle.addImage(o2);
    obstacle.scale=0.7;
    break
    case 3:obstacle.addImage(o3);
    obstacle.scale=0.6;  
    break
    case 4:obstacle.addImage(o4);
    obstacle.scale=0.5;  
    break
    case 5:obstacle.addImage(o5);
    obstacle.scale=0.5;
    break
    case 6:obstacle.addImage(o6);
    obstacle.scale=0.5;  
    break
  default:break
  }
  obsgr.add(obstacle);
  }
}
function Restart(){
  gamestate="play";
  score=0
  trex.changeAnimation("running", trex_running);
  obsgr.destroyEach();
  cloudgr.destroyEach();
}
