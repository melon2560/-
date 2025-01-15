const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const opening = document.getElementById('opening');
const game = document.getElementById('game');
const timerDisplay = document.getElementById('timer');
const countdownDisplay = document.getElementById('countdown');
const resultDialog = document.getElementById('result-dialog');
const resultMessage = document.getElementById('result-message');
const continueButton = document.getElementById('continue-button');

const cellSize = 20;
const cols = 20;
const rows = 20;
let timer = 0;
let timerInterval;
let score = parseInt(localStorage.getItem('score'), 10) || 0; // 初期化を0に設定
let thisscor = 60;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let maze = createMaze(cols, rows);
let player = { x: 0, y: 0 };
let goal = { x: cols - 1, y: rows - 1 };

function createMaze(cols, rows) {
    let maze = new Array(cols).fill().map(() => new Array(rows).fill(0));

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            maze[x][y] = {
                x: x * cellSize,
                y: y * cellSize,
                walls: [true, true, true, true], // top, right, bottom, left
                visited: false
            };
        }
    }

    generateMaze(0, 0, maze);
    return maze;
}

function generateMaze(x, y, maze) {
    const stack = [];
    maze[x][y].visited = true;
    stack.push(maze[x][y]);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors = getUnvisitedNeighbors(current, maze);

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];

            if (next.x > current.x) { // right
                current.walls[1] = false;
                next.walls[3] = false;
            } else if (next.x < current.x) { // left
                current.walls[3] = false;
                next.walls[1] = false;
            } else if (next.y > current.y) { // down
                current.walls[2] = false;
                next.walls[0] = false;
            } else if (next.y < current.y) { // up
                current.walls[0] = false;
                next.walls[2] = false;
            }

            stack.push(next);
            next.visited = true;
        } else {
            stack.pop();
        }
    }
}

function getUnvisitedNeighbors(cell, maze) {
    const neighbors = [];
    const x = cell.x / cellSize;
    const y = cell.y / cellSize;

    if (x > 0 && !maze[x - 1][y].visited) neighbors.push(maze[x - 1][y]);
    if (x < cols - 1 && !maze[x + 1][y].visited) neighbors.push(maze[x + 1][y]);
    if (y > 0 && !maze[x][y - 1].visited) neighbors.push(maze[x][y - 1]);
    if (y < rows - 1 && !maze[x][y + 1].visited) neighbors.push(maze[x][y + 1]);

    return neighbors;
}

function drawMaze(maze) {
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const cell = maze[x][y];
            const x0 = cell.x;
            const y0 = cell.y;
            const x1 = x0 + cellSize;
            const y1 = y0 + cellSize;

            ctx.beginPath();
            ctx.moveTo(x0, y0);
            if (cell.walls[0]) ctx.lineTo(x1, y0);
            else ctx.moveTo(x1, y0);
            if (cell.walls[1]) ctx.lineTo(x1, y1);
            else ctx.moveTo(x1, y1);
            if (cell.walls[2]) ctx.lineTo(x0, y1);
            else ctx.moveTo(x0, y1);
            if (cell.walls[3]) ctx.lineTo(x0, y0);
            else ctx.moveTo(x0, y0);
            ctx.stroke();
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function drawGoal() {
    ctx.fillStyle = 'red';
    ctx.fillRect(goal.x * cellSize, goal.y * cellSize, cellSize, cellSize);
}

function movePlayer(event) {
    const key = event.key;
    const x = player.x;
    const y = player.y;
    const cell = maze[x][y];

    if (key === 'ArrowUp' && !cell.walls[0] && y > 0) player.y--;
    if (key === 'ArrowRight' && !cell.walls[1] && x < cols - 1) player.x++;
    if (key === 'ArrowDown' && !cell.walls[2] && y < rows - 1) player.y++;
    if (key === 'ArrowLeft' && !cell.walls[3] && x > 0) player.x--;

    if (player.x === goal.x && player.y === goal.y) {
        clearInterval(timerInterval);
        showResultDialog();
        document.removeEventListener('keydown', movePlayer); // キーボード入力を無効化
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(maze);
    drawPlayer();
    drawGoal();
}

function startGame() {
    var bgm = document.getElementById('bgm');
    bgm.play();
    startButton.disabled = true;
    let countdown = 3;
    countdownDisplay.textContent = 'ゲーム開始まで: ' + countdown + '秒';
    countdownDisplay.style.display = 'block';

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = 'ゲーム開始まで: ' + countdown + '秒';
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownDisplay.style.display = 'none';
            timer = 0;
            timerDisplay.textContent = 'タイム: 0秒';
            game.style.display = 'flex';
            opening.style.display = 'none';
            drawGame();
            timerInterval = setInterval(() => {
                timer++;
                timerDisplay.textContent = 'タイム: ' + timer + '秒';
            }, 1000);
        }
    }, 1000);
}

function showResultDialog() {
    thisscor -= timer;
    score += thisscor;
    resultMessage.textContent = 'ゴールに到達しました！ 経過時間: ' + timer + '秒 スコア:' + thisscor + '現在のスコア:' + score;
    localStorage.setItem('score', score);
    resultDialog.style.display = 'block';
}

function resetGame() {
    player.x = 0;
    player.y = 0;
    timer = 0;
    timerDisplay.textContent = 'タイム: 0秒';
    startButton.disabled = false;
    game.style.display = 'none';
    opening.style.display = 'flex';
    resultDialog.style.display = 'none';
    drawGame();
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', movePlayer);
continueButton.addEventListener('click', resetGame);

drawGame();
