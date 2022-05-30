var spaceShipImg, enemyImg, astronautImg
var spaceImg, restartImg
var score = 0

var PLAY = 1
var END = 0
var gameState = PLAY

var enemyG,enemy
var astronautG,astronaut




function preload(){
    spaceImg = loadImage('space.jpg')
    restartImg = loadImage('restart.png')

    spaceShipImg = loadImage('spaceShip.png')
    enemyImg = loadImage('enemy.png')
    astronautImg = loadImage('astronaut.png')

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    spaceShip = createSprite(width / 2, height / 2 + 200)
    spaceShip.addImage('spaceShip', spaceShipImg)
    spaceShip.scale = 0.2

    restart = createSprite(width / 2, height / 2)
    restart.addImage('restart', restartImg)
    restart.scale = 0.4
    restart.visible = false

    

    
    astronautG = new Group()
    enemyG = new Group()
}

function draw() {
 spaceShip.debug = true
 
 background(spaceImg)
 
 drawSprites()

 console.log(frameCount)

 text('Pontuação: ' + score, width - 200, 50)
 text.Color = '46'
 score = 0

 if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60)
    
    spawnEnemy()
    spawnAstronaut()

   
    if (astronautG.isTouching(spaceShip)) {
        score = 5
    }

    if (keyDown("D")){
        spaceShip.x = spaceShip.x + 7
    }

    if (keyDown("A")){
        spaceShip.x = spaceShip.x + -7
    }

    if (enemyG.isTouching(spaceShip)) {
       gameState = END
    }

  } 
  else if (gameState === END) { 
    restart.visible = true

    spaceShip = destroy

    enemyG.setVelocityYEach(0)
    enemyG.setLifetimeEach(-1)

    astronautG.setVelocityYEach(0)
    astronautG.setLifetimeEach(-1)

    if (mousePressedOver(restart)) {
      reset()
    }
  }
}

function spawnEnemy() {
    if (frameCount % 40 === 0) {
        
      enemy.velocityY = enemy.velocityY + 6
      
      var enemy = createSprite(width, height - 65, 10, 40)
      enemy.addImage(enemyImg)

      enemy.X = Math.round(random(400, width / 2 - 400))
      enemy.scale = 0.3
      enemy.lifetime = 300
      enemyG.add(enemy)
    }  
}



function spawnAstronaut() {
    if (frameCount % 100 === 0) {

      astronaut.velocityY = astronaut.velocityY + 6

      var astronaut = createSprite(width, 120, 40, 10)
      astronaut.addImage(astronautImg)

      astronaut.X = Math.round(random(400, width / 2 - 400))

      astronaut.scale = 0.1
      astronaut.lifetime = 300
      astronautG.add(astronaut)
   }
}

    

function reset() {
    gameState = PLAY
    restart.visible = false
  
    enemyG.destroyEach()
    astronautG.destroyEach()

    score = 0
}
