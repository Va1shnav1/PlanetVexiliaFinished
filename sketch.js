const World=Matter.World;
const Engine=Matter.Engine;
const Bodies=Matter.Bodies;

var Gafus, GafusImg;
var Toqq, ToqqImg;
var bgImage1, rockyBgImg2, waterBgImg3, lifeBgImg4;
var meteorGroup;
var cometGroup;
var starGroup;
var brickGroup;
var gameState=0;
var Start, Restart;
var starImg;
var Flag=false;
var Flag2=false;
var cometImg, meteorImg, stillMeteorImg;
var world, engine;
var ToqqBody, brickBody;
var gBrick, gBrickimg;
var graveImg, grave;
var score=0;
var playBrick, playStep, playComet, playMeteor, playGBrick;
function preload(){
  bgImage1=loadImage("Images/WelcomBG.jpg");
  GafusImg=loadAnimation("Images/Gafus1.png", "Images/Gafus2.png", "Images/Gafus3.png", "Images/Gafus4.png");
  cometImg=loadImage("Images/comet.png");
  meteorImg=loadImage("Images/meteor.png");
  ToqqImg=loadAnimation("Images/Toqq1.png","Images/Toqq2.png","Images/Toqq3.png","Images/Toqq4.png",
  "Images/Toqq5.png","Images/Toqq6.png","Images/Toqq7.png")
  rockyBgImg2=loadImage("Images/Rocky planet.jpg");
  lifeBgImg4=loadImage("Images/Life Planet.jpg")
  starImage=loadAnimation("Images/star1.png","Images/star2.png","Images/star3.png", "Images/star4.png",
 "Images/star5.png", "Images/star6.png", "Images/star7.png", "Images/star8.png");
  stillMeteorImg=loadImage("Images/stillMeteor.png");
  gBrickImg=loadImage("Images/spaceStone.png");
  graveImg=loadImage("Images/grave.png");
  //loadAnimation
  playBrick=loadSound("Sounds/bricks.mp3");
  playStep=loadSound("Sounds/step.mp3");
  playComet=loadSound("Sounds/comet.mp3");
  playMeteor=loadSound("Sounds/meteor.mp3");
  playGBrick=loadSound("Sounds/gBrick.mp3");
}
function setup() {
 createCanvas(displayWidth, displayHeight);
 engine =Engine.create();
  world=engine.world;
  Gafus=createSprite(displayWidth/7, displayHeight-100, 10, 10)
  Gafus.addAnimation("alien", GafusImg);
  Gafus.scale=1.2;
  Toqq=createSprite(displayWidth/2, displayHeight-400);
  Toqq.addAnimation("float", ToqqImg);
  //Toqq.debug=true;
  Toqq.setCollider("circle", 0, 0, 125);
  Start=createButton("PLAY");
  Start.position(displayWidth/2-250, displayHeight-100);
  Start.style("background", "yellow");
  Start.style("width", "500px");
  Start.style("height", "40px");
  Restart=createButton("RESTART");
  Restart.style("background", "darkred");
  Restart.style("width", "500px");
  Restart.style("height", "40px");
  Restart.hide();
  starGroup = new Group();
  brickGroup = new Group();
  cometGroup = new Group();
  meteorGroup = new Group();
  gBrick=createSprite(random(50, displayWidth-100), random(50, displayHeight-700), 40, 20)
  gBrick.addImage(gBrickImg);
  gBrick.scale=0.15;
  //gBrick.debug=true;
  gBrick.setCollider("circle", 0, 0, 60)
  gBrick.visible=false;
  //ToqqBody = new StarToqq(Toqq.x, Toqq.y);
}
function draw() {
  if(gameState===0){
    background(bgImage1);
    textSize(70);
    stroke("white")
    strokeWeight(5);
    fill("lightblue")
    text("WELCOME TO PLANET VEXILIA", 70, 80)
    textSize(15);
    noStroke();
    fill("white")
    text("Good day, Toqq! It appears that you've finally stumbled across Vexilia!", 20, 160);
    text("I've been waiting for you. I'm Gafus.", 20, 190);
    text("While Vexilia is a glorious planet, it is also very dangerous.", 20, 220);
    text("You must survive the various obstacles that come your way in order to land.", 20, 250);
    text("I promise it is far more beautiful to look at closer up.", 20, 280)
    text("To survive, you must use the arrow keys to move up and down.", 20, 310);
    text("Use the space bar to shoot your stars at the meteors.", 20, 340)
    text("The small ones move slowly, and by hitting them, you get 50 points.", 20, 370);
    text("However, you need to dodge the bigger ones. If you get hit, the game ends!", 20, 400);
    text("Luckily, you also have comets, and if you hit those, you can get 100 points!", 20, 430);
    text("Every time, you get 300 points, the slow meteors move back back up a little.", 20, 460);
    text("The objective of the game is to hit the space crystal, which is constantly moving.", 20, 490);
    text("Once you hit that, you get to land on Planet Vexilia and get to discover its treasures.", 20, 520);
    text("Good luck, dear explorer, and have fun!",20, 550);

    Start.mousePressed(()=>{
      gameState=1;
      Start.hide();
    })

  }
  if (gameState===2 || gameState===3){
    Restart.position(displayWidth/2-250, displayHeight-100);
    Restart.show();
    Restart.mousePressed(()=>{
      gameState=0;
      Restart.hide();
      location.reload();
    })
  }
  if(gameState===1){
    background(rockyBgImg2);
    //first game level
    //different bg-rock planet
    spawnMeteors();
    spawnComets();
    fill("white");
    textSize(30);
    strokeWeight(5);
    stroke("yellow");
    text("Score: "+score, displayWidth/2-50, displayHeight-50);
    Toqq.scale=0.5;
    Toqq.y=displayHeight-200;
    Gafus.visible=false;
    gBrick.visible=true;
    if(frameCount%40===0){
      gBrick.x=random(100, displayWidth-100);
    }
    if(keyDown(LEFT_ARROW)){
      Toqq.x=Toqq.x-5;
      playStep.play();
    }
    if(keyDown(RIGHT_ARROW)){
      Toqq.x=Toqq.x+5;
      playStep.play();
    }
    if(Flag===false){
      spawnBricks();
    }
    console.log(gameState);
    console.log(Flag2)
    if(meteorGroup.isTouching(Toqq)){
      playMeteor.play();
      Ldestroy();
     //END GAME
   }
   if(score%500===0 && score>0){
      //reset brick position a further distance away
      spawnBricks();
      score=0;
   }
   if(brickGroup.isTouching(Toqq)){
    Ldestroy();
  }
      if(Flag2===true){
        //console.log("1")
        for(var i=0; i<brickGroup.length; i++){
          if(starGroup.isTouching(brickGroup.get(i))){
           brickGroup.get(i).destroy();
            starGroup.destroyEach();
            playBrick.play();
            score=score+50;
          }  
        if(starGroup.isTouching(gBrick)){
          playGBrick.play();
          Wdestroy();
        }
       }
       for(var i=0; i<cometGroup.length; i++){
        if(starGroup.isTouching(cometGroup.get(i))){
         cometGroup.get(i).destroy();
          starGroup.destroyEach();
          playComet.play();
          score=score+100;
        }
     }
   }

  }

  if(gameState===2){
    background(lifeBgImg4);
    textSize(60)
    fill("lightblue");
    strokeWeight(5);
    stroke("white");
    text("GAME OVER", displayWidth/2-100, displayHeight-600);
    text("Congratulations! You landed!", displayWidth/2-100, displayHeight-500);
    Toqq.scale=0.8
  }
  if(gameState===3){
    background("black");
    textSize(60)
    fill("white");
    strokeWeight(5);
    stroke("red");
    Toqq.visible=false;
    text("GAME OVER", displayWidth/2-160, displayHeight-500);
    text("Better luck next time...", displayWidth/2-200, displayHeight-150);
    grave=createSprite(displayWidth/2, displayHeight/2+40, 30, 30);
    grave.addImage(graveImg);
    grave.scale=0.35;
  }
  drawSprites();
  //a = "10"
  //"" text, otherwise it would be number; a is text
  //b=20
  //20 as a number to b
  //if(a==10){
    //passes as true
  //}
  //if(a===10){
    //returns as false because data type is different
  //}
  //ToqqBody.display();
  // == checks for value that is stored inside it/ lenient
  //=== strict, checks for value and data type
  Engine.update(engine);
}
function spawnBricks(){
  for(var i=0; i<=20; i++){
    brick=createSprite(i*65, random(displayHeight-700, displayHeight-550), 50, 30);
    strokeWeight(5);
    brick.addImage(stillMeteorImg);
    brick.scale=0.15;
    brickGroup.add(brick);
   //brick.debug=true;
    brick.setCollider("circle", 0, 0, 125)
    brickGroup.setVelocityYEach(0.095)
  }
  Flag=true;
}
function spawnStars(){
  var star=createSprite(Toqq.x, Toqq.y, 10, 10);
  star.addAnimation("shooting star", starImage);
  star.scale=0.12;
  star.velocityY=-7;
  starGroup.add(star);
  star.lifetime=displayHeight/5;
  //star.debug=true;
  star.setCollider("circle", 0, 0, 125)
  Flag2=true;
}
function spawnMeteors(){
  if(frameCount%250===0){
    var meteor = createSprite(random(0, displayWidth), -10, 15, 15);
    meteor.addImage(meteorImg);
    meteor.velocityY=8+score/500;
    meteorGroup.add(meteor);
    meteor.lifetime=displayHeight/6;
    meteor.scale=0.12;
    //meteor.debug=true;
    meteor.setCollider("circle", 0, 160, 280)
  }

}
function spawnComets(){
  if(frameCount%500===0){
    var comet = createSprite(displayWidth+20, random((0, displayHeight-(Toqq.height-20))-40), 15, 15);
    comet.addImage(cometImg);
    comet.scale=0.2;
    comet.velocityX=-(11+score/500);
    //comet.debug=true;
    cometGroup.add(comet);
    comet.lifetime=displayWidth/11;
    comet.setCollider("rectangle", 0, 0, comet.width, 80, -15);
  }
}
function Ldestroy(){
  gBrick.destroy();
  brickGroup.destroyEach();
  cometGroup.destroyEach();
  meteorGroup.destroyEach();
  starGroup.destroyEach();
  gameState=3;
}
function Wdestroy(){
  gBrick.destroy();
  brickGroup.destroyEach();
  cometGroup.destroyEach();
  meteorGroup.destroyEach();
  starGroup.destroyEach();
  gameState=2;
}
function keyPressed(){
  if(keyCode===32){
    console.log("stars");
    spawnStars();
  }
}




