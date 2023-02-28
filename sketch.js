var PLAY = 1;
var END = 0;
var EstadoDeJogo = PLAY;
var path, carro, invisibleBlock, invisibleBlockGroup, ob1;
var pathImg,carroImg, ob1Img;
var i;
var obstaculo;

function preload(){
  pathImg = loadImage("path.png");
  carroImg = loadImage("carro.png");
  ob1Img = loadImage ("obstaculo 1.png");
}

function setup(){
  
  createCanvas(600,600);
  
//mover fundo
path=createSprite(300,600);
path.addImage(pathImg);
path.velocityY = 1;

//criar carro (mudei a posição inicial do carro)
carro = createSprite(300,520,30,30);
carro.scale=0.3;
carro.addImage(carroImg);
  
//criar barra esquerda (mexi na posição, tamanho e coloquei o visible para falso)
leftBoundary=createSprite(0,300,250,600);
leftBoundary.visible = false;

//criar barra direita (mexi na posição, tamanho e coloquei o visible para falso)
rightBoundary=createSprite(600,300,250,600);
rightBoundary.visible = false;

pontos = 0;

grupoObstaculos=new Group();
invisibleBlockGroup=new Group();
}


function draw() {
  background(180);
  
  /* coloquei tudo para dentro do if do estado de jogo PLAY, ele estava acabando na linha 51, agora vai até o final do código e adicionei o drawSprites dentro dele, assim o fundo, o carro e os objetos somem no final do jogo */

  if (EstadoDeJogo === PLAY){
    pontos = pontos + Math.round(frameCount / 60);
    path.velocityY = 4; 

    // mover carro com setas
    if (keyDown("left_arrow")){
      carro.x = carro.x - 3;
    }
    if (keyDown("right_arrow")){
      carro.x = carro.x + 3;  
    }

    //coloquei o carro para colidir com as bordas, assim ele não sai da tela
    carro.collide(rightBoundary);
    carro.collide(leftBoundary);
    
    //resetar o fundo
    if(path.y > 400 ){
      path.y = height/4;
    } 

    criarObstaculos();
  
    //adicionei o if para mudar o estado de jogo quando o carro toca nos obstáculos
    if (carro.isTouching(invisibleBlockGroup)){
      EstadoDeJogo = "END";
    }
    drawSprites();
  }

  if(EstadoDeJogo === "END"){
    stroke("yellow");
    fill ("yellow");
    textSize(30);
    text("fim de jogo ",300,300);
  }
}

//criando obstaculos
function criarObstaculos() {
  if (frameCount % 240 === 0) {
    obstaculo = createSprite(200, -50);
    invisibleBlock = createSprite(200,15,obstaculo.width,2);
    invisibleBlock.visible = false;
    obstaculo.addImage(ob1Img);
    obstaculo.x = Math.round(random(250,350));
    invisibleBlock.x = obstaculo.x;
    obstaculo.velocityY= 1;
    invisibleBlock.velocityY = 1;
    obstaculo.lifetime = 800;
    invisibleBlock.lifetime = 800;
    carro.depth = carro.depth;
    carro.depth += 1;
    obstaculo.scale = 0.2;
    grupoObstaculos.add(obstaculo);
    invisibleBlockGroup.add(invisibleBlock);
  }
}