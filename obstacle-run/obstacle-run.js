// プレイヤーと障害物の要素を取得
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const startButton = document.getElementById("startButton");

let isJumping = false; 
let isGameOver = false; 
let playerPosition = 0; 
let hasJumped = false; 
let speed = 5; 
let resetCount = 0; 
let score = 0;  
let musterscore = parseInt(localStorage.getItem('score'), 10) || 0; // 初期化を0に設定

const scoreDisplay = document.createElement("div"); 
scoreDisplay.id = "score";
document.getElementById("game").appendChild(scoreDisplay);

startButton.addEventListener("click", startGame);

function startGame() {
  var bgm = document.getElementById('bgm');
  bgm.play();
  startButton.disabled = true;
  let count = 3;
  const countdownDisplay = document.createElement("div");
  countdownDisplay.id = "countdown";
  document.getElementById("game").appendChild(countdownDisplay);

  const countdownInterval = setInterval(() => {
    if (count > 0) {
      countdownDisplay.textContent = `${count}秒後にゲーム開始`;
      count--;
    } else {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "";
      initializeGame();
    }
  }, 1000);
}

function initializeGame() {
  isGameOver = false;
  playerPosition = 0;
  score = 0;
  obstacle.style.left = "600px";
  hasJumped = false;
  document.addEventListener("keydown", jump);
  gameLoop();
  updateScore();
}

function jump(event) {
  if (event.key === " " && !isJumping) {
    isJumping = true;
    hasJumped = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight >= 70) {
        clearInterval(jumpInterval);
        fall();
      } else {
        jumpHeight += 5;
        player.style.bottom = `${jumpHeight}px`;
      }
    }, 20);
  }
}

function fall() {
  let jumpHeight = parseInt(player.style.bottom);
  const fallInterval = setInterval(() => {
    if (jumpHeight <= 0) {
      clearInterval(fallInterval);
      isJumping = false;
    } else {
      jumpHeight -= 5;
      player.style.bottom = `${jumpHeight}px`;
    }
  }, 20);
}

function gameLoop() {
  const obstaclePosition = parseInt(obstacle.style.left);

  if (obstaclePosition <= 0) {
    obstacle.style.left = "600px";
    resetCount += 1;
    score += 10;

    if (resetCount >= 3) {
      speed += 0.5;
      if (speed > 15) speed = 15;
      resetCount = 0;
    }
  } else {
    obstacle.style.left = `${obstaclePosition - speed}px`;
  }

  const playerBottom = parseInt(player.style.bottom);
  const obstacleHeight = 40;
  const isCollidingHorizontally = obstaclePosition < 35 && obstaclePosition > 10;
  const isCollidingVertically = playerBottom < obstacleHeight;

  if (!hasJumped && isCollidingHorizontally) {
    gameOver();
    return;
  }

  if (isCollidingHorizontally && isCollidingVertically) {
    gameOver();
    return;
  }

  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }

  updateScore();
}

function gameOver() {
  isGameOver = true;
  startButton.disabled = false;
  musterscore += score;
  localStorage.setItem('score', musterscore);

  const dialog = document.createElement("div");
  dialog.id = "gameOverDialog";
  dialog.innerHTML = `
  <h2>ゲームオーバー！</h2>
  <p>あなたのスコア: ${score}</p>
  <p>合計スコア: ${musterscore}</p>
  <button id="linkButton">マップに戻る</button>
`;


  document.body.appendChild(dialog);

  document.getElementById("linkButton").addEventListener("click", () => {
    window.location.href = "../map/u-22_map1.html";
  });
}

function updateScore() {
  scoreDisplay.textContent = `スコア: ${score}`;
}
