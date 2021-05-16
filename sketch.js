var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var score = 0;
var rock, rockImage;
var gameOver, gameOverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  rockImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);

  gameOver = createSprite(400, 200, 20, 10)
  gameOver.addImage(gameOverImage)

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() { 
  background(0);
  fill("white");
  textSize(20);
  text("Score: " + score, 400, 200)

  if(gameState===PLAY){
  gameOver.visible = false;
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    spawnFood();
    spawnObstacles();
    if(ObstaclesGroup.isTouching(player)){
      gameState = END;
    }
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += 0.1
    }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
    if(gameState === END){
      backgr.velocityX = 0;
      ObstaclesGroup.destroyEach();
      FoodGroup.destroyEach();
      player.visible = false;
      /*textSize(30);
      fill(225)
      text("Game Over!", 300, 220)
      */
      gameOver.visible = true;
    }
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    var rock = createSprite(600, 340, 40, 10)
    rock.addImage(rockImage)
    rock.scale = 0.2
    rock.velocityX = -4;
    rock.lifetime = 300;
    player.depth = rock.depth;
    ObstaclesGroup.add(rock);
  }
}