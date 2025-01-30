
class point{
    x: number;
    y: number;
    constructor (x: number, y: number){
        this.x = x;
        this.y = y;
    }
}
class node{
    point: point;
    direction: string;
    prevP: point;
    constructor (point: point , prevP: point , direction: string){
        this.point = point;
        this.direction = direction;
        this.prevP = prevP;
    }
    setData(point: point , s: string){
        this.prevP = this.point;
        this.point = point;
        this.direction = s;
    }
    setDirection(s: string){
        this.direction = s;
    }
}
let apx : number  , apy : number;
function randomApple() {
    while (true) {
        apx = Math.floor(Math.random() * 15);
        apy = Math.floor(Math.random() * 17);
        let isOccupied = snake.some(segment => segment.point.x === apx && segment.point.y === apy);

        if (!isOccupied) {
            let position = document.getElementById(`cell-${apx}-${apy}`);
            if (position) {
                position.innerHTML = `<div class="GreenDot"></div>`;
            }
            console.log(`Apple at ${apx} ${apy}`);
            break;
        }
    }
}
function checkIfHeadTouchBody():void{
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].point.x === snake[i].point.x && snake[0].point.y === snake[i].point.y){
            clearInterval(game);
            let menu = document.getElementById('startMenu');
            menu?.style.setProperty('display', 'flex');
            document.getElementsByTagName('h1')[0].innerHTML = 'Game Over'; 
            document.getElementsByTagName('button')[0].style.setProperty('display', 'none');
        }
    }
}
function addCell(){
    snakeLength++;
    let last = snake[snake.length - 1];
    let newPoint = new point(last.prevP.x, last.prevP.y);
    let newCell = new node(newPoint, newPoint, last.direction);
    snake.push(newCell);
    newPosition();
}
function moveAll(){
    for (let i = 1; i < snake.length; i++) {
        snake[i].setData(snake[i-1].prevP, snake[i-1].direction);
    }
}
function moveHead(d:string){
    if (d === 'up'&& snake[0].point.x > 0 && snake[0].point.x <= 14){ 
        snake[0].setData(new point(snake[0].point.x - 1, snake[0].point.y) , 'up' );
    }
    else if (d === 'down'&& snake[0].point.x >= 0 && snake[0].point.x < 14){
        snake[0].setData(new point(snake[0].point.x + 1, snake[0].point.y) , 'down');
    }
    else if (d === 'left'&& snake[0].point.y > 0 && snake[0].point.y <= 16){
        snake[0].setData(new point(snake[0].point.x, snake[0].point.y - 1) , 'left');
    }
    else if (d === 'right'&& snake[0].point.y >= 0 && snake[0].point.y < 16){
        snake[0].setData(new point(snake[0].point.x, snake[0].point.y + 1) , 'right'); 
    }
    else{
        clearInterval(game);
        let menu = document.getElementById('startMenu');
        menu?.style.setProperty('display', 'flex');
        document.getElementsByTagName('h1')[0].innerHTML = 'Game Over';
        document.getElementsByTagName('button')[0].style.setProperty('display', 'none');
    }
    moveAll();
    newPosition();
    checkIfHeadTouchBody();
    if(snake[0].point.x === apx && snake[0].point.y === apy){
        addCell();
        randomApple();
    }
}
function clear(){
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 17; col++) {
            let position = document.getElementById(`cell-${row}-${col}`);
            if (position && position.innerHTML !== `<div class="GreenDot"></div>`) {
                position.innerHTML = ``;
            }
        }
    }
}
function newPosition(){
    clear();
    for (let i = 0; i < snakeLength; i++) {
        let pos:point = snake[i].point;
        let position = document.getElementById(`cell-${pos.x}-${pos.y}`);
        if (position) {
            if(i === 0){
                position.innerHTML = `<div class="head"></div>`;
            }
            else if(i === snakeLength - 1){
                position.innerHTML = `<div class="tail"></div>`;  
            }
            else{
                position.innerHTML = `<div class="dot"></div>`;
            }
        }
    }
}
function step(direction:string){
    if(snake[0].direction === 'up' && direction !== 'down'){
        snake[0].setDirection(direction);
    }
    else if(snake[0].direction === 'down' && direction !== 'up'){
        snake[0].setDirection(direction);
    }
    else if(snake[0].direction === 'left' && direction !== 'right'){
        snake[0].setDirection(direction);
    }
    else if(snake[0].direction === 'right' && direction !== 'left'){
        snake[0].setDirection(direction);
    }
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        step("up");
    }
    else if (event.key === 'ArrowDown') {
        step("down");
    }
    else if (event.key === 'ArrowLeft') {
        step("left");
    }
    else if (event.key === 'ArrowRight') {
        step("right");
    }
});
let snakeLength:number = 1;
let snake: node[] = [];
snake.push(new node(new point(0, 0) ,new point(0, 0), 'right'));
let position = document.getElementById(`cell-${snake[0].point.x}-${snake[0].point.y}`);
if (position) {
    position.innerHTML = `<div class="head"></div>`;
}
let time = 100;
let game:any
    let startGameButton = document.getElementById('startBtn');
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            let menu = document.getElementById('startMenu');
            menu?.style.setProperty('display', 'none');
            game = setInterval(() => {
                moveHead(snake[0].direction);
                if (ScoreD) {
                    ScoreD.innerHTML = `Score: ${snakeLength}`;
                }
                else{
                    console.error('Score display element not found');
                }
            }, time);
            randomApple();
        });
    } else {
        console.error('Start Game button not found');
    }
    let ScoreD = document.getElementById('score');
    if (!ScoreD) {
        console.error('Score display element not found');
    }
/* let pauseGameButton = document.querySelector('#menuIcon');
pauseGameButton?.addEventListener('click', () => {
    clearInterval(game);
    if (pauseGameButton) {
        let menu = document.getElementById('startMenu');
        menu?.style.setProperty('display', 'flex');
    }
}); */