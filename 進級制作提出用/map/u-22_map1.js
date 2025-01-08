// ------------------------------------------------------------
// 初期設定部分：必要なHTML要素を取得
// ------------------------------------------------------------
const gameContainer = document.getElementById('gameContainer'); // ゲームエリア全体の要素
const character = document.getElementById('character'); // キャラクター要素（プレイヤーの駒）
const message = document.getElementById('message'); // サイコロの目やメッセージを表示する要素
const messagescore = document.getElementById('score'); //スコアの表示
const rollButton = document.getElementById('rollButton'); // サイコロを振るボタンの要素
const dialogOverlay = document.getElementById('dialogOverlay'); // ダイアログオーバーレイの要素
const dialogMessage = document.getElementById('dialogMessage'); // ダイアログメッセージの要素
const dialogButton = document.getElementById('dialogButton'); // ダイアログボタンの要素

let score = 0;
let minigemecount = 0; // ミニゲームの順番を指定

// ローカルストレージからスコア、位置、ミニゲームの順番を取得
score = parseInt(localStorage.getItem('score'), 10) || 0;
minigemecount = parseInt(localStorage.getItem('game'), 10) || 0;
let currentIndex = parseInt(localStorage.getItem('iti'), 10) || 0;

// ------------------------------------------------------------
// マス目の配置設定
// ------------------------------------------------------------

// マスの位置を保持する配列（適当な座標を指定）
let boardPositions = [
    { x: 810, y: 100 },  // 1番目のマス
    { x: 1010, y: 140 },  // 2番目のマス
    { x: 1130, y: 190 },  // 3番目のマス
    { x: 1218, y: 250 },  // 4番目のマス
    { x: 1240, y: 350 },  // 5番目のマス
    { x: 1250, y: 463 },  // 6番目のマス
    { x: 1215, y: 560 },  // 7番目のマス
    { x: 1140, y: 678 },  // 8番目のマス
    { x: 1000, y: 722 },   // 9番目のマス
    { x: 860, y: 740 },   // 10番目のマス
    { x: 710, y: 740 },  // 11番目のマス
    { x: 570, y: 715 },  // 12番目のマス
    { x: 450, y: 655 },  // 13番目のマス
    { x: 423, y: 561 },  // 14番目のマス
    { x: 400, y: 478 },  // 15番目のマス
    { x: 393, y: 393 },  // 16番目のマス
    { x: 416, y: 325 },  // 17番目のマス
    { x: 448, y: 252 },   // 18番目のマス
    { x: 541, y: 183 },    // 19番目のマス
    { x: 680, y: 127 }     // 20番目のマス
];

// 初期位置を設定（最初はスタートマス）
character.style.left = (boardPositions[currentIndex].x - 25) + 'px'; // キャラクターの左位置
character.style.top = (boardPositions[currentIndex].y - 25) + 'px'; // キャラクターの上位置
messagescore.textContent = `スコア: ${score}`;

// ------------------------------------------------------------
// サイコロ機能の実装
// ------------------------------------------------------------

// サイコロを振る（1～6のランダムな数値を生成）
function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // 1から6までの乱数
    //return 1; // 常に1を返す
}

// ------------------------------------------------------------
// キャラクターを移動する処理
// ------------------------------------------------------------

// 指定されたマス数だけキャラクターを移動
function moveCharacter(stepsToMove) {
    // 目標位置を計算（現在位置に移動数を加算）
    let targetIndex = currentIndex + stepsToMove;

    // 最終マスを超えた場合は、0に戻す（何周でもできるように）
    if (targetIndex >= boardPositions.length) {
        targetIndex = targetIndex % boardPositions.length; // モジュロ演算でインデックスを循環させる
    }

    // 現在位置を更新
    currentIndex = targetIndex;

    // 移動先の座標を取得
    const pos = boardPositions[currentIndex];

    // キャラクターの位置をアニメーションで更新（左と上の座標）
    character.style.transition = "left 1s, top 1s"; // アニメーションの設定
    character.style.left = (pos.x - 25) + 'px';
    character.style.top = (pos.y - 25) + 'px';

    // 移動が完了した後にイベントダイアログを表示
    setTimeout(showEventDialog, 1000); // 1秒待機してからダイアログを表示
}

// ------------------------------------------------------------
// ラッキー・アンラッキーイベントダイアログを表示する関数
// ------------------------------------------------------------
function showEventDialog() {
    const isLucky = Math.random() > 0.5; // ラッキーかアンラッキーかをランダムに決定
    if (isLucky) {
        dialogMessage.textContent = "ラッキー！ボーナスを獲得！スコア+3";
        score += 3;
    } else {
        dialogMessage.textContent = "アンラッキー！ペナルティを受けました。スコア-2";
        score -= 2;
    }
    messagescore.textContent = `スコア: ${score}`;
    dialogOverlay.style.display = 'flex'; // ダイアログを表示
}

// ------------------------------------------------------------
// ダイアログボタンのクリックイベント
// ------------------------------------------------------------
dialogButton.addEventListener('click', () => {
    dialogOverlay.style.display = 'none'; // ダイアログを非表示
    localStorage.setItem('score', score);
    startMiniGame(); // ミニゲームを開始
});

// ------------------------------------------------------------
// ミニゲームを開始する関数
// ------------------------------------------------------------
function startMiniGame() {
    const miniGames = [
        "../mogutata/mogutata.html", "../quiz/quiz.html", "../pk/pk.html", "../puzzle/puzzle.html", "../meiro/meiro.html",
        "../typing/typing.html", "../renda/renda.html", "../shooting/shooting.html", "../obstacle-run/obstacle-run.html", "../much3/much3.html"
    ];
    //minigemecount = 9;  //デバッグ用
    const zyunbanGame = miniGames[minigemecount]; // ミニゲームを順番ずつ
    minigemecount++;
    localStorage.setItem('game', minigemecount);
    localStorage.setItem('iti', currentIndex);
    window.location.href = zyunbanGame; // ミニゲームのページに移動
}

// ------------------------------------------------------------
// イベントリスナーの設定
// ------------------------------------------------------------

// サイコロを振るボタンがクリックされたときの処理
rollButton.addEventListener('click', () => {
    // サイコロを振って結果を取得
    const diceResult = rollDice();
    // 結果をメッセージエリアに表示
    message.textContent = `サイコロの目: ${diceResult}`;
    // サイコロの目に応じてキャラクターを移動
    moveCharacter(diceResult);
});
