// script.js
// プレイヤーと障害物の要素を取得
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
// ゲーム開始ボタンを取得
const startButton = document.getElementById("startButton");

// ジャンプ中かどうか、ゲームオーバーかどうか、プレイヤーの位置を管理
let isJumping = false; // プレイヤーがジャンプ中かどうか
let isGameOver = false; // ゲームが終了したかどうか
let playerPosition = 0; // プレイヤーの位置
let hasJumped = false; // プレイヤーがジャンプしたかどうかのフラグ
let speed = 5; // 初期スピード
let resetCount = 0; // 障害物がリセットされた回数
let score = 0;  // スコア

const scoreDisplay = document.createElement("div"); // スコア表示用の要素を作成
scoreDisplay.id = "score"; // IDを設定
document.getElementById("game").appendChild(scoreDisplay); // ゲームエリアに追加

// カウントダウン表示用の要素を作成
const countdownDisplay = document.createElement("div");
countdownDisplay.id = "countdown";
document.getElementById("game").appendChild(countdownDisplay);

// ゲーム開始ボタンのクリックイベントを追加
startButton.addEventListener("click", startGame);

// ゲームを開始する関数
function startGame() {
  startButton.disabled = true; // ゲーム開始ボタンを無効化
  let count = 3;
  
  // カウントダウンの表示を開始
  const countdownInterval = setInterval(() => {
    if (count > 0) {
      countdownDisplay.textContent = `${count}秒後にゲーム開始`;
      count--;
    } else {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "";
      initializeGame(); // 実際のゲーム開始処理
    }
  }, 1000);
}

// 実際のゲーム初期化処理を新しい関数に移動
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

// ジャンプする関数
function jump(event) {
  if (event.key === " " && !isJumping) { // スペースキーが押され、プレイヤーがジャンプ中でない場合
    isJumping = true; // プレイヤーをジャンプ中に設定
    hasJumped = true; // ジャンプしたのでフラグを立てる
    let jumpHeight = 0; // ジャンプの高さ
    const jumpInterval = setInterval(() => { // ジャンプのアニメーション
      if (jumpHeight >= 70) { // ジャンプの高さが100を超えた場合
        clearInterval(jumpInterval); // ジャンプのアニメーションを停止
        fall(); // プレイヤーを落下させる
      } else {
        jumpHeight += 5; // ジャンプの高さを増加
        player.style.bottom = `${jumpHeight}px`; // プレイヤーの位置を更新
      }
    }, 20);
  }
}

// 落下する関数
function fall() {
  let jumpHeight = parseInt(player.style.bottom); // ジャンプの高さ
  const fallInterval = setInterval(() => { // 落下のアニメーション
    if (jumpHeight <= 0) { // ジャンプの高さが0以下になった場合
      clearInterval(fallInterval); // 落下のアニメーションを停止
      isJumping = false; // プレイヤーをジャンプ中でない状態に設定
    } else {
      jumpHeight -= 5; // ジャンプの高さを減少
      player.style.bottom = `${jumpHeight}px`; // プレイヤーの位置を更新
    }
  }, 20);
}

// ゲームのループ関数
function gameLoop() {
  const obstaclePosition = parseInt(obstacle.style.left); // 障害物の位置

  if (obstaclePosition <= 0) {
    obstacle.style.left = "600px";

    resetCount += 1; // リセットカウンターを増加

    score += 10

    // 3回リセットされたらスピードを上げる
    if (resetCount >= 3) {
      speed += 0.5; // スピードを上げる
      if (speed > 15) speed = 15; // スピードの上限を設定
      resetCount = 0; // カウンターをリセット
    }
  } else {
    obstacle.style.left = `${obstaclePosition - speed}px`; // 障害物の位置を更新
  }
  const playerBottom = parseInt(player.style.bottom); // プレイヤーの高さを取得
  const playerHeight = 30; // プレイヤーの高さ（例として30px）
  const obstacleHeight = 40; // 障害物の高さ（例として40px）

  // 横幅の調整
  const isCollidingHorizontally = obstaclePosition < 35 && obstaclePosition > 10;

  // 縦方向の調整
  const isCollidingVertically = playerBottom < obstacleHeight;

  // ジャンプしていない状態で障害物に当たった場合
  if (!hasJumped && isCollidingHorizontally) {
    gameOver();
    return;
  }

  if (isCollidingHorizontally && isCollidingVertically) { // プレイヤーが障害物に当たった場合
    gameOver(); // ゲームオーバー
    return;
  }

  if (!isGameOver) { // ゲームが終了していない場合
    requestAnimationFrame(gameLoop); // ゲームループを継続
  }

  updateScore(); // スコアを更新
}

// ゲームオーバーを宣言する関数
function gameOver() {
  isGameOver = true; // ゲームを終了
  startButton.disabled = false; // ゲーム開始ボタンを有効化
  alert("ゲームオーバー！"); // アラートでゲームオーバーを表示
  document.removeEventListener("keydown", jump); // キーボードのイベントリスナーを削除
}

// スコアを更新して表示する関数
function updateScore() {
  scoreDisplay.textContent = `スコア: ${score}`; // スコアを表示
}