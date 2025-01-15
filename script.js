const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let pont = document.querySelector("#pont");
const gameover = document.querySelector(".game-over")

const size = 20;

let snake= [
    {
        x: Math.floor((canvas.width/(2 * size))) * size, 
        y: Math.floor((canvas.width/(2 * size))) * size
    }
];
let direction = {
    x: size,
    y: 0
};

let food = {
    x: Math.floor(Math.random() * (canvas.width / size)) * size,
    y: Math.floor(Math.random() * (canvas.height / size)) * size
};

let score = 0;
let gameOver = false;




// Mapeando teclas de movimento
document.addEventListener('keydown', (e) => {
    if(e.key == "ArrowUp" && direction.y === 0){
        direction = {
            x: 0,
            y: -size
        }
    } else if(e.key == "ArrowDown" && direction.y === 0){
        direction = {
            x: 0,
            y: size
        }
    } else if(e.key == "ArrowRight" && direction.x === 0){
        direction = {
            x: size,
            y: 0
        }
    } else if(e.key == "ArrowLeft" && direction.x === 0){
        direction = {
            x: -size,
            y: 0
        }
    }

})

function update(){

    // Defino a posição da cabeça já que a cabeça que sempre irá se mover
    const head = {
        x: snake[0].x += direction.x,
        y: snake[0].y += direction.y
    }

    // Confiro se essa posição colide com as paredes
    if((head.y < 0 || head.y >= canvas.height) || (head.x >= canvas.width || head.x < 0)){
        gameOver = true;
    }

    // Adiciono a posição da cabeça na primeira posição da cobra
    snake.unshift(head);

    // Confiro se a cobra pega a comida se pegar adicionar mais uma posição 
    // se não ele remove a última posição, logo, com isso dá o mecanismo de andar
    // da cobra, já que aumenta um bloco na frente e remove um atrás
    if(head.x === food.x && head.y === food.y){
        score+=10;
        pont.innerHTML = score
        snake.push({x: snake[snake.length - 1].x += direction.x, y: snake[snake.length - 1].y += direction.y});
        newFood();
    } else{
        snake.pop();
    }

    // Limpo o canvas e executo o método para desenhar o jogo atual
    // e o jogo se consiste nisso, em apagar o desenho do canvas anterior
    // e desenhar um novo com novas posições e isso ocorre a cada 100 ms
    // como configurado no método run()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

function run(){
    // Faço um update do jogo e confiro se o jogo acabou se sim
    // tela de login se não ele espera 100ms para executar o run
    // novamente e assim ele executar o run a cada 100ms enquanto
    // gameOver for false
    update();
    if(!gameOver){
        setTimeout(run, 100);
    } else{
        gameover.style.display = "flex";
        console.log("Game over");
    }
}

function newFood(){
    food.x = Math.floor(Math.random() * (canvas.width / size)) * size,
    food.y = Math.floor(Math.random() * (canvas.height / size)) * size
}

function draw(){
    ctx.fillStyle = "blue";
    ctx.fillRect(snake[0].x, snake[0].y, size, size);

    snake.forEach((part) => {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x, part.y, size, size);
    })

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, size, size);
}

function reset(){
    location.reload();
}

run();
