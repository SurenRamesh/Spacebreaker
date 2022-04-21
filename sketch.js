var outerspacebackground
var playbuttonimg, playerplaneimg, enemyplanesimg, meteorsimg, laserbulletimg
var score = 0
var spacelogo
var bossspace

var gameState = "start"

var enemyplanes

function preload() {
  outerspacebackground = loadImage("Images/outerspaceeeeee.jpg")
  playbuttonimg = loadImage("Images/Omgomgomgomg.png")
  playerplanesimg = loadImage("Images/planesssss-removebg-preview.png")
  enemyplanesimg = loadImage("Images/planes2-removebg-preview.png")
  meteorsimg = loadImage("Images/meteors-removebg-preview.png")
  laserbulletimg = loadImage("Images/lasers-removebg-preview.png")
  spacelogo = loadImage("Images/spaceeeeeeebrreaker.png")
  bossspace = loadImage("Images/bossship-removebg-preview.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight)


  spacebreakerlogo = createSprite(windowWidth/2,windowHeight/2 - 150,30,30)
  spacebreakerlogo.addImage(spacelogo)
  spacebreakerlogo.visible = false
  spacebreakerlogo.scale = 6



  playerplanes = createSprite(100, windowHeight / 2, 30, 30)
  playerplanes.addImage(playerplanesimg)
  playerplanes.visible = false
  playerplanes.rotation = 90


  playbutton = createSprite(windowWidth / 2, windowHeight / 2 + 130 + 100, 20, 20)
  playbutton.addImage(playbuttonimg)
  playbutton.visible = false;
  playbutton.scale = 0.35



  meteorpack = new Group()

  laserspewpew = new Group()

  badplanes = new Group()
}


function draw() {
  background("grey")

  drawSprites()
  fill("purple")
  text("score: " + score, windowWidth - 200, 50)

  //------------------------------START------------------------------------------------

  if (gameState === "start") {
    //background(outerspacebackground)
    playbutton.visible = true
    spacebreakerlogo.visible = true



    //------------------------------------------------LEVEL 1 condition------------------------------------------------
    if (mousePressedOver(playbutton)) {
      gameState = "Level 1"
    }
  }

  //------------------------------------------------LEVEL 1------------------------------------------------

  if (gameState === "Level 1") {
    //background(outerspacebackground)

    if (keyWentDown("SPACE")) {
      laserroulette()
    }

    playerplanes.visible = true;
    playbutton.visible = false;
    spacebreakerlogo.visible = false

    meteorshower()

    playerplanes.x = World.mouseX
    playerplanes.y = World.mouseY

    if (laserspewpew.isTouching(meteorpack)) {
      meteorpack[0].destroy()
      laserspewpew[0].lifetime = 0
      score += 27
    }

    


    //------------------------------------------------LEVEL 2 condition------------------------------------------------
    if (score >= 100) {
      
      textSize(50)
    stroke("Teal")
    strokeWeight(5)
    text("Level 2", windowWidth / 3 - 100, windowHeight - 100);
    text("Press Down Arrow to move to Level 2", windowWidth / 3 - 100, windowHeight - 250);
    if(keyCode === 25){
      gameState = "Level2"
    }
    }

    //------------------------------------------------Game Over condition------------------------------------------------  
    if (meteorpack.isTouching(playerplanes)) {
      gameState = "Game Over"
    }

  }

  //------------------------------------------------LEVEL 2 ------------------------------------------------

  if (gameState === "Level2") {


    score = 0

    

    meteorshower();
    meteors.visible = false;
    meteorpack.destroyEach();

    playerplanes.x = World.mouseX
    playerplanes.y = World.mouseY

    enemyplanesarehere();

    if (keyWentDown("SPACE")) {
      laserroulette()
    }

    if (laserspewpew.isTouching(badplanes)) {
      badplanes[0].destroy()
      laserspewpew[0].lifetime = 0
      score += 6;
    }

    if (badplanes.isTouching(playerplanes)) {
      gameState = "Game Over"
    }


    if(score >= 500){
      gameState = "Level 3"
      
      textSize(50)
    stroke("Teal")
    strokeWeight(5)
    text("Level 3", windowWidth / 3 - 100, windowHeight - 100);
    }

  }

  if(gameState === "Level 3"){


  

  }

  //------------------------------------------------Game Over------------------------------------------------

  if (gameState == "Game Over") {
    playerplanes.destroy()
    meteorpack.destroyEach()
    laserspewpew.destroyEach()
    textSize(75)
    stroke("Teal")
    strokeWeight(5)
    text("Game Over, bozo.", windowWidth / 2 - 300, windowHeight / 2 - 100);
  }
}

function meteorshower() {
  if (frameCount % 35 === 0) {
    meteors = createSprite(windowWidth, windowHeight, 10, 10)
    meteors.y = random(20, windowHeight - 75)
    meteors.addImage(meteorsimg)
    meteors.velocityX = -25
    meteors.scale = 0.75
    meteors.lifetime = width / 10
    meteorpack.add(meteors)
  }
}

function laserroulette() {
  lasers = createSprite(100, windowHeight / 2, 50, 10)
  lasers.addImage(laserbulletimg)
  lasers.rotation = 90
  lasers.shapeColor = "yellow"
  lasers.x = playerplanes.x + 100
  lasers.y = playerplanes.y
  laserspewpew.add(lasers)
  lasers.velocityX = 30
  lasers.scale = 0.5


}

function enemyplanesarehere() {
  if (frameCount % 35 === 0) {
    enemyplanes = createSprite(windowWidth, windowHeight, 30, 30)
    enemyplanes.y = random(20, windowHeight - 75)
    enemyplanes.rotation = 180
    enemyplanes.addImage(enemyplanesimg)
    enemyplanes.velocityX = -25
    enemyplanes.scale = 0.75
    enemyplanes.lifetime = width / 10
    badplanes.add(enemyplanes)
    enemyplanes.visible = true
  }
}