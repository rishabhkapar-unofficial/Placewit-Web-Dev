
// Game Board
let board = document.getElementById("board");
let boardCells = {};

// Game Variables
// let snakeStart = [[15, 18], [15, 17], [15,16], [15, 15], [15, 14], [15, 13], [15, 12]];
let snakeStart = [[15, 15]];
let snake = JSON.parse(JSON.stringify(snakeStart));
let direction = 'right';
let movement;
let snakeSpeed = 200;
let foodCell = [-1, -1];
let score = 0;
let state = 'playing';

// Dimensions
let numOfCols = 30, numOfRows = 30;
let cellHeight = board.clientHeight / numOfRows;
let cellWidth = board.clientWidth / numOfCols;
let cellMargin = 0.5;

// Colorsww
let snakeColor = 'red';
let backgroundColor = 'white';
let snakeHeadColor = 'black';
let foodColor = 'green';


(function () {
    createBoard();
    reset();
})();


// Game Logic
function normalMode(event) {
    // console.log(event);
    if(event.code === 'KeyA') {
        if(!isInvalidMove(getNewCell('left')))
            direction = 'left';
    } else if(event.code === 'KeyW') {
        if(!isInvalidMove(getNewCell('up')))
            direction = 'up';
    } else if(event.code === 'KeyS') {
        if(!isInvalidMove(getNewCell('down')))
            direction = 'down';
    } else if(event.code === 'KeyD') {
        if(!isInvalidMove(getNewCell('right')))
            direction = 'right';
    } else if(event.code === 'Space') {
        if(state === 'playing') {
            state = 'paused';
            pause();
        }
    }
}


function paused(event) {
    if(event.code === 'Space') {
        if(state === 'paused') {
            state = 'playing';
            play();
        }
    }
}


function createBoard() {
    for(let i = 0; i < numOfRows; i++) {
        let flexRow = createDivWithFlex("row");
        board.appendChild(flexRow);
        boardCells[i] = {}
        for(let j = 0; j < numOfCols; j++) {
            let cell = createDiv(cellWidth, cellHeight);
            cell.id = "div"+(numOfRows*i + j);
            flexRow.appendChild(cell);
            boardCells[i][j] = cell;
        }
    }
}

function move() {
    let newCell = getNewCell(direction);
    if(!isCellValid(newCell) || isInvalidMove(newCell)) {
        finishGame();
        return;
    }
    snake.unshift(newCell);
    renderSnake();
    if(newCell[0] === foodCell[0] && newCell[1] === foodCell[1]) { 
        generateFood();
        updateSpeed(-10);
        score++;
    } else
        turnOffCell(snake.pop());
}


function renderSnake() {
    let head  = snake[0];
    boardCells[head[0]][head[1]].style.backgroundColor = snakeHeadColor;

    for(let i = 1; i < snake.length; i++)
        turnOnCell(snake[i]);
}


function reset() {
    resetBoard();
    snake = JSON.parse(JSON.stringify(snakeStart));
    direction = 'right';
    if(movement !== 'undefined')
        clearInterval(movement);
    generateFood();
    score = 0;
    play();
}


function finishGame() {
    alert(`Your Score: ${score}!`, );
    reset();
}


function generateFood() {
    let x = getRandomNumber(numOfRows-1, 0),
        y = getRandomNumber(numOfCols-1, 0);
    foodCell = [x, y];
    if(isInvalidMove(foodCell)) {
        generateFood();
        return;
    }
    colorFoodCell(foodCell);
}


function pause() {
    console.log('Paused');
    clearInterval(movement);
    window.onkeypress = paused;
}

function play() {
    movement = setInterval(move, snakeSpeed);
    window.onkeypress = normalMode;
}

// Helper Functions

function turnOnCell(cell) {
    let x = cell[0], y = cell[1];
    if(isCellValid(cell))
        boardCells[x][y].style.backgroundColor = snakeColor;
}

function turnOffCell(cell) {
    let x = cell[0], y = cell[1];
    if(isCellValid(cell))
        boardCells[x][y].style.backgroundColor = backgroundColor;
}

function isCellValid(cell) {
    let x = cell[0], y = cell[1];
    if(x >= 0 && x < numOfRows && y >= 0 &&  y < numOfCols) {
        return true;
    }
    return false;
}

function isInvalidMove(cell) {
    for(let i = 0; i < snake.length; i++) {
        if(snake[i][0] === cell[0] && snake[i][1] === cell[1])
            return true;
    }
    return false;
}


function resetBoard() {
    for(let i = 0; i < numOfRows; i++) {
        for(let j = 0; j < numOfCols; j++) {
            turnOffCell([i, j]);
        }
    }
}


function getNewCell(direction) {
    let newCell = [-1, -1];
    if(direction === 'right') {
        newCell = [snake[0][0], snake[0][1] + 1];
    } else if (direction === 'left') {
        newCell = [snake[0][0], snake[0][1] - 1];
    } else if(direction === 'up') {
        newCell = [snake[0][0]-1, snake[0][1]];
    } else if(direction === 'down') {
        newCell = [snake[0][0]+1, snake[0][1]];
    }
    return newCell;
}


function createDivWithFlex(flexDirection) {
    let flex = document.createElement('DIV');
    flex.style.display = 'flex';
    flex.style.flexDirection = flexDirection;
    return flex;
}


function createDiv(width, height) {
    let div = document.createElement('DIV');
    div.style.width = (width-2*cellMargin) + 'px';
    div.style.height = (height-2*cellMargin) + 'px';
    div.style.margin = cellMargin + 'px';
    return div;
}

function getRandomNumber(max, min) {
    return Math.floor(Math.random()*(max-min) + min);
}


function colorFoodCell(cell) {
    let x = cell[0], y = cell[1];
    boardCells[x][y].style.backgroundColor = foodColor;
}


function updateSpeed(delta) {
    if(snakeSpeed + delta >= 50)
        snakeSpeed += delta;
}