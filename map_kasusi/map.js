const mapSize = 20;
const player = { position: 0, score: 0 };
let turn = 1;
let isDiceRolled = false; // サイコロを振ったかのフラグ
// ゲーム開始フラグとオープニング画面の切り替え
let gameStarted = false; // ゲームが開始されたかどうかのフラグ
let minigemecount = 0;  //ミニゲームの順番を指定

document.getElementById("start-game").addEventListener("click", () => {
  document.getElementById("opening-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  updatePlayerMarker();
  gameStarted = true;
});

// 円形マップの生成
const mapContainer = document.getElementById("map-container");
const radius = 180; // 円の半径
for (let i = 0; i < mapSize; i++) {
  const tile = document.createElement("div");
  tile.classList.add("map-tile");

  const angle = (i / mapSize) * 2 * Math.PI; // 各マスを円形に配置
  const x = radius * Math.cos(angle) + 275; // 中心を調整
  const y = radius * Math.sin(angle) + 275;
  tile.style.left = `${x}px`;
  tile.style.top = `${y}px`;

  if (i === 0) {
    tile.classList.add("start-tile");
  } else if (i % 5 === 0) {
    tile.classList.add("event-tile");
  } else if (i % 7 === 0) {
    tile.classList.add("trap-tile");
  } else if (i % 3 === 0) {
    tile.classList.add("bonus-tile");
  } else {
    tile.classList.add("normal-tile");
  }

  mapContainer.appendChild(tile);
}

// プレイヤーマーカーの生成
const playerMarker = document.createElement("div");
playerMarker.id = "player-marker";
mapContainer.appendChild(playerMarker);

// サイコロを振る
const rollDiceButton = document.getElementById("roll-dice");
const diceValueSpan = document.getElementById("dice-value");
const turnCount = document.getElementById("turn-count");
const playerScore = document.getElementById("player-score");
const tileEffectDisplay = document.getElementById("tile-effect-display");

rollDiceButton.addEventListener("click", () => {
  if (isDiceRolled || turn > 10) return;

  const diceValue = Math.floor(Math.random() * 6) + 1;
  diceValueSpan.textContent = diceValue;
  movePlayer(diceValue);
  isDiceRolled = true;
});

// プレイヤーを進める
function movePlayer(steps) {
  player.position = (player.position + steps) % mapSize;
  updatePlayerMarker();
  updateScore();
  showTileContentDialog(); // マスの内容ダイアログを表示
  turn++;
  turnCount.textContent = turn;
}

// プレイヤーマーカーの更新
function updatePlayerMarker() {
  const tiles = mapContainer.children;
  const currentTile = tiles[player.position];
  playerMarker.style.left = currentTile.style.left;
  playerMarker.style.top = currentTile.style.top;
}

// スコアとマスの効果を更新
function updateScore() {
  const tiles = mapContainer.children;
  const currentTile = tiles[player.position];

  let effectMessage = "通常のマスです。";
  if (currentTile.classList.contains("bonus-tile")) {
    player.score += 3;
    effectMessage = "ボーナスマス！スコア +3";
  } else if (currentTile.classList.contains("trap-tile")) {
    player.score -= 3;
    effectMessage = "罠マス！スコア -3";
  } else if (currentTile.classList.contains("event-tile")) {
    effectMessage = "イベントマス！何かが起こる予感…";
  }

  playerScore.textContent = player.score;
  tileEffectDisplay.textContent = effectMessage;
}

// マスの内容ダイアログを表示
function showTileContentDialog() {
  const tileContentDialog = document.getElementById("tile-content-dialog");
  const tileContentMessage = document.getElementById("tile-content-message");
  tileContentMessage.textContent = tileEffectDisplay.textContent;
  tileContentDialog.classList.remove("hidden");
}

// マスの内容ダイアログのOKボタン
const okTileContentButton = document.getElementById("ok-tile-content");
okTileContentButton.addEventListener("click", () => {
  const tileContentDialog = document.getElementById("tile-content-dialog");
  tileContentDialog.classList.add("hidden");
  showMiniGameDialog(); // ダイアログを閉じた後にミニゲームダイアログを表示
});

// ミニゲームダイアログ
const dialogContainer = document.getElementById("dialog-container");
const playMinigameButton = document.getElementById("play-minigame");
const closeDialogButton = document.getElementById("close-dialog");

function showMiniGameDialog() {
  dialogContainer.classList.remove("hidden");
}

// ミニゲームに移行するボタン
playMinigameButton.addEventListener("click", () => {
  const miniGameLinks = [
    "../meiro/meiro.html",
    "minigame2.html",
    "minigame3.html",
    "minigame4.html",
    "minigame5.html",
    "minigame6.html",
    "minigame7.html",
    "minigame8.html",
    "minigame9.html",
    "minigame10.html",
  ];
  const randomLink = miniGameLinks[Math.floor(Math.random() * miniGameLinks.length)];
  const randomLink2 = miniGameLinks[minigemecount]; //ミニゲームを順番ずつ
  minigemecount++;
  window.location.href = randomLink;
});

// ミニゲームダイアログを閉じるボタン
closeDialogButton.addEventListener("click", () => {
  dialogContainer.classList.add("hidden");
  isDiceRolled = false; // サイコロを振ってもいい状態にリセット
});
