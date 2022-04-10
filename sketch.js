var target, targetImg;
var bg, backgroundImg;
var player;
var score =0;
var ball, ball1Img, ball2Img;
var gameOver, gameOverImg;
var restartImg, restart;
var person1Img, person2Img;
var racket, racketImg;
var border;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  targetImg = loadImage("assets/Target.png");
  ball1Img = loadImage("assets/Ball1.png");
  ball2Img = loadImage("assets/Ball2.png");
  backgroundImg = loadImage("assets/Court.png");
  winImg = loadImage("assets/Win.png");
  gameOverImg = loadImage("assets/GameOver.png");
  racketImg = loadImage("assets/Racket.png");
  restartImg = loadImage("assets/Restart.png");
  person1Img = loadImage("assets/Person1.png");
  person2Img = loadImage("assets/Person2.png");
  startImg = loadImage("assets/GameSquash.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  bottomGround = createSprite(windowWidth, windowHeight/5+400);
  bottomGround.visible = false;

  topGround = createSprite(windowWidth, windowHeight/5-100);
  topGround.visible = false;
  
  ball = createSprite(20,20,20,20);
  ball.addImage("ball",ball1Img);
  ball.scale = 0.2;
  ball.debug = true;

  target = createSprite(200,200,30,30);
  target.visible = true;
  target.addImage("target",targetImg);

  racket = createSprite(200,200,20,20);
  racket.visible = true;
  racket.addImage("racket",racketImg);

  bg = createSprite(windowWidth, windowHeight);
  bg.visible = true;
  bg.addImage("bg",backgroundImg)

  rightBorder = createSprite(500,windowHeight,20);
  rightBorder.visible = false;

  leftBorder = createSprite(0,windowHeight,20);
  leftBorder.visible = false;

  win = createSprite(windowWidth,windowHeight);
  win.addImage("win", winImg);
  win.visible = false;

  gameOver = createSprite(windowWidth, windowHeight);
  restart = createSprite(220,240);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart.addImage(restartImg);
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  target.visible = false;
  racket.visible = false;
  ball.visible = false;
  bg.visible = false;
}

function draw() {
  background(startImg);  

  text("Press Enter to Play!",200,200,30,30)
  textSize(30);
  textFont("impact");
  fill("black");

  if(keyDown("enter")){
    gameState=PLAY;
  }

  if(gameState === PLAY){

    bg.visible = true;
    target.visible = true;
    racket.visible = true;
    ball.visible = true;
    
    if(ball.isTouching(racket)){
      ball.bounceOff(racket, score);
      ball.addImage("ball",ball2Img);
    }
  
    if(ball.isTouching(target)){
      ball.bounceOff(target, score);
      score=score+1;
    }
  
    

    target.velocityX = 10;
    target.velocityY = 2; 

  
    if(keyDown("space")){
      ball = createSprite(positionX.random, positionY.random)
      ball.scale = 0.25;
      player.addimage("player", person2Img);
    }

    if(score=20){
      win.visible = true;
    }

    if(ball.isTouching(bottomGround)||ball.isTouching(topGround)||ball.isTouching(leftBorder)||ball.isTouching(rightBorder)){
      gameState=END
      ball.destroy();
      target.destroy();
      player.destroy();
      gameOver.visible=true;
    }
  }

   if(gameState === END) 
    {
          gameOver.visible = true;
          restart.visible = true;
          
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

          drawSprites();
          Score();
    } 
  }

  function reset()
    {
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;

    score=0;
  }
  function score()
  {
         if(ball.isTouching(target))
         {
           score=score+1;
         }
        text("Score:"+score, 400,20,20,20);
        textFont("impact");
        textSize(50);
        fill("black");
      
}