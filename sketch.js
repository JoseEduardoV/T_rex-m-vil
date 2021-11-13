var jumping;
var checkPoint;
var die;
var reset;
var restart;
var gameover;
var game_over;
var T_rex_dead;
var END=0;
var PLAY=1;
var gamestate=PLAY;
var score=0;
var cloudsgroup;
var cactusgroup;
var cactus6;
var cactus5;
var cactus4;
var cactus3;
var cactus2;
var cactus1;
var cactus;
var cloud;
var invisibleground;
var Ground;
var ground;
var edges;
var T_rex_running;
var T_rex;

function preload()
{    T_rex_running=loadAnimation("trex1.png","trex3.png"," trex4.png");
  Ground=loadImage("ground2.png");
  cloud2=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
 T_rex_dead=loadAnimation("trex_collided.png");
 gameover=loadImage("gameOver.png");
 reset=loadImage("restart.png");
 jumping=loadSound("jump.mp3");
 checkPoint=loadSound("checkPoint.mp3");
 die=loadSound("die.mp3");
}




function setup ()
{
  createCanvas (windowWidth, windowHeight);
  console.log(windowWidth);
  restart=createSprite(windowWidth/2,windowHeight/2,30,30);
  //Hola yo del futuro no se te vaya a olvidar los comandos que aprendiste durante el juego
  restart.addImage(reset);
  restart.scale=.5;
  restart.visible=false;
  game_over=createSprite(windowWidth/2,(windowHeight/2)-40,90,30);
  game_over.addImage(gameover);
  game_over.scale=.5;
  game_over.visible=false;
  cactusgroup=new Group();
  //Use la clase Group para meter todos mis obstaculos en un solo grupo y después hacer más fácil la colisión
  cloudsgroup=new Group();
  T_rex=createSprite(windowWidth-windowWidth+50, windowHeight-130, 70, 80);
  T_rex.debug=false;
  T_rex.setCollider("rectangle",0,0,T_rex.width,T_rex.height);
  //El collider es como la heatbox del Sprite
  T_rex.addAnimation("running",T_rex_running);
  T_rex.addAnimation("Dying",T_rex_dead);
  ground=createSprite(300, 380, 600, 10);
  ground.addImage(Ground);
  invisibleground=createSprite(300, 395, 600, 10);
  invisibleground.visible=false;
  //cloud=createSprite(550, 50, 90, 20);
  edges=createEdgeSprites();
}
function draw()
{
  background ("white");
  
  if(gamestate==PLAY)//estados del juego
{
    ground.velocityX= -(5+(score/100));
  if(ground.x<0){
    ground.x=300;
  }
  score=score+Math.round(getFrameRate()/60)
  if(score%100==0&&score>0)
  {
  checkPoint.play();//sonido cada cien puntos
  }
   if((touches.length>0||keyDown("space"))&&T_rex.y>=330)
  {
  T_rex.velocityY=-20;
  jumping.play();
  touches=[];
    //es para vaciar los touches después de que se llene
  }
  T_rex.velocityY=T_rex.velocityY+1;//La gravedad
  
  clouds();//funciones que cree
  obstacles();
  if(cactusgroup.isTouching(T_rex))
  {
  gamestate=END;
  console.log(gamestate);   
  die.play();
  }
}
  else if(gamestate==END)
  {
  ground.velocityX=0;    
  cloudsgroup.setVelocityXEach(0);
  cactusgroup.setVelocityXEach(0);
  T_rex.velocityY=0;
  T_rex.changeAnimation("Dying",T_rex_dead);
  cactusgroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);//Para que los catcus se queden cuando el trex choque con ellos esta funtion acepta tres valores que son: 1, -1, 0 El 1 es para que se queden, siempre el -1 es para que se queden un tiempo y el 0 es para que desaparescan al instante
  restart.visible=true;
  game_over.visible=true;
    if(mousePressedOver(restart))//si se pressiona el mouse se hará una función
  {
  Restart();
  }
}
  
  text("score:"+score, windowWidth-100, windowHeight-470);
  //console.log(T_rex.depth);
  T_rex.collide(invisibleground);
  drawSprites  ();
  }


function clouds()
  {
  if(frameCount%200==0)
  {
  cloud=createSprite(windowWidth, windowHeight-100, 90, 20);
  cloud.y=Math.round(random(windowHeight-windowHeight+10,windowHeight-windowHeight+140));
  cloud.velocityX=-4;
  cloud.addImage(cloud2);
  cloud.lifetime=150;
  cloud.depth=T_rex.depth;
  Trex_depth=T_rex.depth+1;
  cloudsgroup.add(cloud);
  }
}
function obstacles()
  {
  if(frameCount%200==0)
  {
  CACTUS=createSprite(windowWidth, windowHeight-140, 20, 50);
  CACTUS.velocityX= -(8+(score/200));//Para que los catus se muevan más rápido conforme avanza el tiempo
  var rand=Math.round(random(1,6));  
  switch(rand)
  {
    case 1:CACTUS.addImage(cactus1);
    break;
    case 2:CACTUS.addImage(cactus2);
    break;
    case 3:CACTUS.addImage(cactus3);
    break;
    case 4:CACTUS.addImage(cactus4);
    break;
    case 5:CACTUS.addImage(cactus5);
    break;
    case 6:CACTUS.addImage(cactus6);
    break;
    default:break;
  } 
  CACTUS.lifetime=150;
  CACTUS.scale=.8
  cactusgroup.add(CACTUS);
  }
}

function Restart()
{
  gamestate=PLAY
  game_over.visible=false;
  restart.visible=false;
  cactusgroup.destroyEach();
  cloudsgroup.destroyEach();
  T_rex.changeAnimation("running",T_rex_running);
  score=0;
}