//import Swal from 'sweetalert2'
function drawIt() {
    var dx = 0;
    dy = 0;
    var WIDTH=1000;
    var HEIGHT=700;
    var r=10;
    var x = WIDTH/2-r;
    var y = 650;
    var tocke;
    var start=true;
    number=3;
    int=0;
    var lives=3;
    var liv=[document.getElementById("img1"),document.getElementById("img2"), document.getElementById("img3")];
    hit=0;
    tockeMult=10;
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    function init() { 
      tocke = 0;
      return intervalId=setInterval(draw, 10);
    }
    
    function circle(x,y,r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
    }
    
    function rect(x,y,w,h) {
      ctx.beginPath();
      ctx.rect(x,y,w,h);
      ctx.closePath();
      ctx.fill();
    }
    
    function clear() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    //END LIBRARY CODE
    function draw() {
    
        clear();
        
        circle(x, y, 10);
        
        if (x + dx > WIDTH-r|| x + dx < 0 +r)
        
        dx = -dx;
        
        if (y + dy > HEIGHT-r|| y + dy < 0 +r)
        
        dy = -dy;
        
        x += dx;
        
        y += dy;
        }
    
    init();
    var paddlex;
    var paddley;
    var paddleh;
    var paddlew;
    
    
    function init_paddle() {
      paddlex = WIDTH / 2-60;
      paddley=690;
      paddleh = 10;
      paddlew = 120;
    }
    
    function draw() {
      clear();
      circle(x, y, 10);
      rect(paddlex, paddley, paddlew, paddleh);
    
      
      if (x + dx > WIDTH-r || x + dx < 0+r)
        dx = -dx;
    
      if (y + dy < 0+r)
        dy = -dy;
        else if (y + dy > HEIGHT-r) {
          start=false;
              if (x > paddlex && x < paddlex + paddlew){
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
          start=true;
          }
              else if (y + dy > HEIGHT-r)
                clearInterval(intervalId);
           
            }
    
      x += dx;
      y += dy;
    }
    init_paddle();
    var rightDown = false;
    var leftDown = false;
    
    //nastavljanje leve in desne tipke
    function onKeyDown(evt) {
      if (evt.keyCode == 39)
    rightDown = true;
      else if (evt.keyCode == 37) leftDown = true;
    }
    
    function onKeyUp(evt) {
      if (evt.keyCode == 39)
    rightDown = false;
      else if (evt.keyCode == 37) leftDown = false;
    }
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp); 
    
    
    var canvasMinX;
    var canvasMaxX;
    
    function init_mouse() {
      //canvasMinX = $("#canvas").offset().left;
    canvasMinX = $("canvas").offset().left;
      canvasMaxX = canvasMinX + WIDTH;
    }
    
    function onMouseMove(evt) {
      if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX-paddlew/2;
      }
    }
    $(document).mousemove(onMouseMove);
    
    
    init_mouse();
    
    var bricks;
    var NROWS = 3;
    var NCOLS = 4;
    var BRICKWIDTH;
    var BRICKHEIGHT = 40;
    var PADDING;
    
    function initbricks() { //inicializacija opek - polnjenje v tabelo
      BRICKWIDTH = (WIDTH/NCOLS) - 1;
      PADDING = 1;
      bricks = new Array(NROWS);
      for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
          bricks[i][j] = 1;
        }
      }
    }
    initbricks();
    
      function draw() {
        clear();
        circle(x, y, 10);
        //premik ploščice levo in desno
        if(rightDown){
          if((paddlex+paddlew) < WIDTH){
          paddlex += 5;
          }else{
          paddlex = WIDTH-paddlew;
          }
          }
          else if(leftDown){
          if(paddlex>0){
          paddlex -=5;
          }else{
          paddlex=0;
          }
          }
      rect(paddlex, paddley, paddlew, paddleh);
      
      //riši opeke
        for (i=0; i < NROWS; i++) {
          for (j=0; j < NCOLS; j++) {
            if (bricks[i][j] == 1) {
              ctx.fillStyle="#2ec72c"
              rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                  (i * (BRICKHEIGHT + PADDING)) + PADDING,
                  BRICKWIDTH, BRICKHEIGHT);
            }
          }
        }
      
        rowheight = BRICKHEIGHT + PADDING + 2; //Smo zadeli opeko?
        colwidth = BRICKWIDTH + PADDING + 2;
        row = Math.floor(y/rowheight);
        col = Math.floor(x/colwidth);
        //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
        //štetje zadetih opek
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
          dy = -dy; bricks[row][col] = 0;
          hit += 1;
          tocke+=(1*tockeMult)
          if(hit==NCOLS*NROWS){
            if(lives<3){
              liv[lives].style.visibility = 'visible';
              lives++;
            }
            dx = 0;
            dy=0;
            tockeMult+=10;
            int+=0.5;
            number=3;
            startGame();
            x = WIDTH/2-r;
            y = 650;
            NCOLS++;
            if(NCOLS>5 && NCOLS%3==0){
              NROWS++;
              BRICKHEIGHT=120/NROWS;
            }
            initbricks();
            init_paddle()
            hit=0;
          }
          $("#tocke").html(tocke);
        }
    
        if (x + dx > WIDTH -r || x + dx < r)
          dx = -dx;
        if (y + dy < 0+r)
          dy = -dy;
        else if (y + dy > HEIGHT -r) {
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
                dy = -dy;
            }
            else if (y + dy > HEIGHT -r) {
              start=false;
                  if (x > paddlex && x < paddlex + paddlew){
              dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
              start=true;
              }
                  else if (y + dy > HEIGHT-r){
                    lives--;
                    if(lives!=-1){
                      liv[lives].style.visibility = 'hidden';
                      dy=0;
                      dx=0;
                      number=3;
                      startGame();
                      x = WIDTH/2-r;
                      y = 650;
                      init_paddle()
                    }else{
                      clearInterval(intervalId);
                      end(tocke);
                    }
                  }
                }
        }
        x += dx;
        y += dy;
      }
    }
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame(){
  document.getElementById("startBtn").disabled = true;
  document.getElementById("number").innerHTML=number;
  number--;
  inter=setInterval(displayNumber, "1000", number==-1);
  setTimeout(() => {
    dy=3+int;
  }, "3000");
}
function displayNumber(){
  document.getElementById("number").innerHTML=number;
  number--;
  if(number==-1){
    clearInterval(inter);
    document.getElementById("number").innerHTML=""
  }
}
function end(tocke){
  Swal.fire({
    title: 'Congratulations! You have managed to get '+tocke+' points.',
    //text: '',
    confirmButtonText: 'COOL',
    icon: 'success',
    background: 'black',
    color: '#2ec72c',
    confirmButtonColor: '#2ec72c',
    iconColor: '#2ec72c'
  }).then(function(){ 
    location.reload();
  }
 );
}

document.addEventListener("DOMContentLoaded", function(){
  Swal.fire({
    title: 'Wecome!',
    text: 'Your objective is to destroy as many bricks as you can to break into NSSAs server. You have 3 lives and if you\'ve lost a heart you\'ll recive another heart after compleating a level. Press the START button to begin. Good luck!',
    confirmButtonText: 'I\'M READY',
    icon: 'info',
    background: 'black',
    color: '#2ec72c',
    confirmButtonColor: '#2ec72c',
    iconColor: '#2ec72c'
  })
});