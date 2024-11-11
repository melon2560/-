// script.js
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const startButton = document.getElementById("startButton");

let isJumping = false;
let isGameOver = false;
let playerPosition = 0;

// ゲーム開始ボタンのクリックイベント
startButton.addEventListener("click", startGame);

function startGame() {
  isGameOver = false;
  playerPosition = 0;
  obstacle.style.left = "600px";
  document.addEventListener("keydown", jump);
  startButton.disabled = true;
  gameLoop();
}

function jump(event) {
  if (event.key === " " && !isJumping) {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight >= 100) {
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

  // 障害物の移動
  if (obstaclePosition <= 0) {
    obstacle.style.left = "600px";
  } else {
    obstacle.style.left = `${obstaclePosition - 5}px`;
  }

  // 衝突判定
  if (obstaclePosition < 50 && obstaclePosition > 20 && player.style.bottom === "0px") {
    gameOver();
    return;
  }

  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

function gameOver() {
  isGameOver = true;
  startButton.disabled = false;
  alert("ゲームオーバー！");
  document.removeEventListener("keydown", jump);
}
