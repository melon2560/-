// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const hpDisplay = document.getElementById('hp');
const scoreDisplay = document.getElementById('score');
const gameOverDialog = document.getElementById('gameOverDialog');
const finalScore = document.getElementById('finalScore');
const continueButton = document.getElementById('continueButton');

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    dx: 0,
    dy: 0,
    hp: 100
};

let bullets = [];
let enemies = [];
let enemyBullets = [];
let enemySpeed = 2;
let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'green';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function drawEnemyBullets() {
    enemyBullets.forEach(bullet => {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // 壁との衝突判定
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            // ゲームオーバー処理をここに追加
        } else if (Math.random() < 0.02) {
            createEnemyBullet(enemy.x + enemy.width / 2 - 5, enemy.y + enemy.height);
        }
    });
}

function moveEnemyBullets() {
    enemyBullets.forEach((bullet, index) => {
        bullet.y += bullet.speedY;
        bullet.x += bullet.speedX;
        if (bullet.y > canvas.height || bullet.x < 0 || bullet.x > canvas.width) {
            enemyBullets.splice(index, 1);
        }
    });
}

function createBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 10,
        height: 20,
        speed: 7
    });
}

function createEnemy() {
    let x = Math.random() * (canvas.width - 50);
    enemies.push({
        x: x,
        y: 0,
        width: 50,
        height: 50
    });
}

function createEnemyBullet(x, y) {
    let angle = Math.random() * Math.PI / 2 - Math.PI / 4; // -45度から45度の間で発射
    let speed = 4;
    enemyBullets.push({
        x: x,
        y: y,
        width: 10,
        height: 20,
        speedX: speed * Math.sin(angle),
        speedY: speed * Math.cos(angle)
    });
}

function collisionDetection() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });
    });

    enemyBullets.forEach((bullet, index) => {
        if (
            bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y
        ) {
            enemyBullets.splice(index, 1);
            player.hp -= 10;
            hpDisplay.textContent = `HP: ${player.hp}`;
            if (player.hp <= 0) {
                gameOver = true;
                showGameOverDialog();
            }
        }
    });

    enemies.forEach((enemy, index) => {
        if (
            enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y
        ) {
            enemies.splice(index, 1);
            player.hp -= 20;
            hpDisplay.textContent = `HP: ${player.hp}`;
            if (player.hp <= 0) {
                gameOver = true;
                showGameOverDialog();
            }
        }
    });
}

function showGameOverDialog() {
    finalScore.textContent = `Final Score: ${score}`;
    gameOverDialog.classList.add('show');
}

function resetGame() {
    player.hp = 100;
    hpDisplay.textContent = `HP: ${player.hp}`;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    gameOver = false;
    gameOverDialog.classList.remove('show');
    update();
}

function update() {
    if (gameOver) return;

    movePlayer();
    moveBullets();
    moveEnemies();
    moveEnemyBullets();
    collisionDetection();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();
    drawEnemyBullets();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = player.speed;
    } else if (e.key === ' ') {
        createBullet();
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' || e.key === 'Right' ||
        e.key === 'ArrowLeft' || e.key === 'Left' ||
        e.key === 'ArrowUp' || e.key === 'Up' ||
        e.key === 'ArrowDown' || e.key === 'Down'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

continueButton.addEventListener('click', resetGame);

setInterval(createEnemy, 1000);

update();
