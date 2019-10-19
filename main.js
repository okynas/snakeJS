const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the dimentions
const box = 30;
const canvasWidth = cvs.clientWidth;
const canvasHeight = cvs.clientHeight;

// create the snake
let snake = [{
    x : 9 * box,
    y : 10 * box
}];

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
} 

// create the score var
let score = Number(0);
let maxPoeng = Number(0);

document.body.querySelector('#score').innerHTML = Number(score);

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// cheack collision function
const collision = (head,array) =>{
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    // ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "#f00"; //red
    ctx.fillRect(food.x, food.y, box, box);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score ++;
        document.body.querySelector('#score').innerHTML = Number(score);

        // eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    if(snakeX < 0 || snakeX > Math.round((canvasWidth/box) - 1) * box || snakeY < 0 || snakeY > Math.round((canvasHeight/box) - 1) * box || collision(newHead,snake)){
        clearInterval(game);
        console.log('dead');
    }
    
    snake.unshift(newHead);
}

// call draw function every 100 ms
let game = setInterval(draw, 100);