let playerPosition = 1; // プレイヤーの位置
let playerHP = 25; // プレイヤーのHP
const maxHP = 25; // プレイヤーの最大HP
let doubleRoll = false; // サイコロの目が2倍になるフラグ
let playerItems = []; // プレイヤーが持つアイテム
let playerCoins = 0; // プレイヤーのコイン
let score = 0;
let dialogIndex = 1;

// ここに新しい変数と関数の定義を追加
let dialogues = [
    { text: "新潟旅行楽しみだな", character: "img/otoko.jpg" },
    { text: "こんにちは、旅人たち！私は新潟の妖精、ニイガタだよ。新潟県にあるハピネスをたくさん教えてあげるから、僕に案内させてよ！", character: "img/niigatakyaraB.jpg" },
    { text: "妖精だって？面白そうだね、ユイ！", character: "img/otoko.jpg" },
    { text: "わぁ、私たちにどんな新潟を見せてくれるの？", character: "img/onnna.jpg" },
    { text: "まずはここ新潟駅。近年リニューアル工事が進んでいて、最近駅ビルの『CoCoLo』のリニューアルが終わったばかりなんだ。", character: "img/niigatakyaraB.jpg" },
    { text: "そうなんだ！新潟駅がどんどん新しくなってるんだね。駅ビルの『CoCoLo』ってどんな感じになったの？", character: "img/otoko.jpg" },
    { text: "リニューアルされた『CoCoLo』、ちょっと気になるね。おしゃれなお店とか、美味しいものがたくさんありそう！", character: "img/onnna.jpg" },
    { text: "うん、『CoCoLo』には地元の特産品を扱うお店や、おいしいグルメが揃っているよ。特に新潟の美味しいお米を使ったおにぎりや、地元の素材を使ったスイーツは絶品だよ！", character: "img/niigatakyaraB.jpg" },
    { text: "へえ、それはいいね！でも、ここだけで一日過ごしちゃいそうだな。", character: "img/otoko.jpg" },
];


let currentDialogue = 0;

function startGame1() {
    // この関数を削除
}

function startGame2() {
    document.getElementById('prologue-screen').style.display = 'none';
    document.getElementById('character-screen').style.display = 'block';
}

function showNextDialogue() {
    // この関数を削除
}

function nextDialogue() {
    // この関数を削除
}

let endingDialogues = [
    { text: "うん、でもせっかくだから他のハピネスな場所も見に行こうよ！ニイガタ、次はどこに連れて行ってくれるの？", character: "img/onnna.jpg" },
    { text: "じゃあ、次は歴史を感じられる場所に行こうか！万代橋に向かおう。", character: "img/niigatakyaraB.jpg" }
];

let currentEndingDialogue = 0;

function showEndingNarration() {
    document.getElementById('board').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.querySelector('.diceContent').style.display = 'none';
    document.getElementById('ending-narration').style.display = 'flex';
    showNextEndingDialogue();
}

// エンディングの次のダイアログを表示する関数
function showNextEndingDialogue() {
    if (currentEndingDialogue < endingDialogues.length) {
        const dialogue = endingDialogues[currentEndingDialogue];
        document.getElementById('ending-narration-content').textContent = dialogue.text;
        document.getElementById('ending-character-icon').src = dialogue.character;
        document.getElementById('ending-character-icon').style.display = dialogue.character ? 'block' : 'none';
        currentEndingDialogue++;
    } else {
        document.getElementById('ending-narration').style.display = 'none';
        showMapButton(); // 次のマップに移動するボタンを表示
    }
}

function nextEndingDialogue() {
    showNextEndingDialogue();
}

// ページ読み込み時にボードをセットアップ
document.addEventListener("DOMContentLoaded", () => {
    setupBoard(); // ボードをセットアップ
    updateDisplays(); // ステータス表示を更新
    highlightPlayer(); // プレイヤーの位置をハイライト
    setupDialogEvent(); // ダイアログのイベントリスナーを設定

    // 「次のマップへ」ボタンのイベントリスナーを設定
    const nextMapButton = document.getElementById('nextMapButton');
    if (nextMapButton) {
        nextMapButton.addEventListener('click', () => {
            location.href = '../minigame/pk.html';
            //location.href = '../u-22(map2)/u-22_map2.html';
        });
    }

    // エンディングナレーションの次へボタンのイベントリスナーを設定
    const nextEndingButton = document.getElementById('nextEndingButton');
    if (nextEndingButton) {
        nextEndingButton.addEventListener('click', () => {
            nextEndingDialogue();
        });
    }
});

// ダイアログのイベントリスナーを設定する関数
function setupDialogEvent() {
    const dialog = document.getElementById('myDialog'); // ダイアログ要素を取得
    const closeDialogButton = document.getElementById('closeDialog'); // ダイアログを閉じるボタンを取得

    if (closeDialogButton) {
        // ダイアログを閉じるボタンにクリックイベントリスナーを追加
        closeDialogButton.addEventListener('click', () => {
            dialog.close(); // ダイアログを閉じる
            location.href = 'map2.html'; // 次のマップに移動
        });
    }
}

// ストーリー表示を設定する関数
function showStory() {
    document.getElementById('character-screen').style.display = 'none'; // キャラクター紹介画面を非表示
    document.getElementById('board').style.display = 'grid';
    document.querySelector('.controls').style.display = 'flex';
    document.querySelector('.diceContent').style.display = 'block';
}

// ゲームクリア時の処理を追加
function finishu() {
    if (playerPosition == 30) { // プレイヤーがゴールマスに到達したかを確認
        saveGameState(); // ゲームの状態を保存
        changeBackgroundImage(); // 背景画像を変更
        showEndingNarration(); // ナレーションを表示
    }
}

// 背景画像を変更する関数を追加
function changeBackgroundImage() {
    document.body.style.backgroundImage = "url('img/background_map1_goal.jpg')";
}

// エンディングのナレーションを表示する関数
function showEndingNarration() {
    document.getElementById('board').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.querySelector('.diceContent').style.display = 'none';
    document.getElementById('ending-narration').style.display = 'flex';
    showNextEndingDialogue(); // 最初のエンディングダイアログを表示
}

// ナレーション表示後、マップ移動ボタンを表示する関数
function showMapButton() {
    document.getElementById('ending-narration').style.display = 'none';
    const dialog = document.getElementById('myDialog'); // ダイアログ要素を取得
    if (dialog) {
        dialog.showModal(); // ダイアログを表示
        document.getElementById('closeDialog').style.display = 'block'; // マップ移動ボタンを表示
    }
}

// ゲーム状態を保存する関数
function saveGameState() {
    // 現在のゲーム状態をローカルストレージに保存
    localStorage.setItem('playerPosition', playerPosition);
    localStorage.setItem('playerHP', playerHP);
    localStorage.setItem('playerItems', JSON.stringify(playerItems));
    localStorage.setItem('playerCoins', playerCoins);
    localStorage.setItem('score', score);
}

// ボードをセットアップする関数
function setupBoard() {
    const board = document.getElementById('board'); // ボード要素を取得
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            const squareIndex = i % 2 === 0 ? i * 6 + j + 1 : i * 6 + (6 - j);
            if (squareIndex > 30) continue; // 30を超えるマスはスキップ
            const square = createSquare(squareIndex); // マスを作成
            board.appendChild(square); // ボードにマスを追加
        }
        if (i < 4) {
            const arrow = document.createElement('div'); // 矢印要素を作成
            arrow.className = 'arrow'; // 矢印のクラスを設定
            arrow.textContent = '⇩'; // 矢印のテキストを設定
            if (i % 2 === 0) {
                arrow.classList.add('even-row'); // 偶数行の場合にクラスを追加
            }
            board.appendChild(arrow); // ボードに矢印を追加
        }
    }
}

// マスを作成する関数[6, 10, 18, 23, 28]
function createSquare(index) {
    const square = document.createElement('div'); // マス要素を作成
    square.className = 'square'; // マスのクラスを設定
    square.id = `square-${index}`; // マスのIDを設定
    if (index === 1) {
        setSquareAttributes(square, "スタート", "start", "🚀");
    } else if (index === 30) {
        setSquareAttributes(square, "ゴール", "goal", "🏁");
    } else if ([].includes(index)) {
        setSquareAttributes(square, "回復", "recovery", "❤️");
    } else if ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].includes(index)) {
        setSquareAttributes(square, "ハプニング", "happening", "⚡");
    } else if ([].includes(index)) {
        setSquareAttributes(square, "クイズ", "quiz", "❓");
    } else {
        setSquareAttributes(square, index, "default"); // 通常のマス
    }
    return square; // マスを返す
}

// マスの属性を設定する関数
function setSquareAttributes(square, text, className, icon = '') {
    square.textContent = text; // マスのテキストを設定
    square.classList.add(className); // マスのクラスを追加
    if (icon) {
        const iconElement = document.createElement('span'); // アイコン要素を作成
        iconElement.className = 'icon'; // アイコンのクラスを設定
        iconElement.textContent = icon; // アイコンのテキストを設定
        square.appendChild(iconElement); // マスにアイコンを追加
    }
}

// ゲームを開始する関数
function startGame() {
    document.getElementById('prologue-screen').style.display = 'none'; // プロローグ画面を非表示
    document.getElementById('story-dialogue').style.display = 'flex';
    showNextDialogue(); // ナレーションと会話の流れを表示
}

// ボードを表示する関数
function showBoard() {
    document.getElementById('character-screen').style.display = 'none'; // キャラクター紹介画面を非表示
    document.querySelector('.board').style.display = 'grid'; // ボードを表示
    document.querySelector('.controls').style.display = 'flex'; // コントロールを表示
    document.querySelector('.diceContent').style.display = 'block'; // サイコロを表示
}

// プレイヤーを移動させる関数
function movePlayer(a) {
    const roll = getDiceRoll(a); // サイコロの出目を取得
    const previousPosition = playerPosition; // 前の位置を保存
    playerPosition = Math.max(1, Math.min(playerPosition + roll, 30)); // 新しい位置を計算
    updateDisplays(roll); // ステータス表示を更新
    checkGameOver();
    highlightPlayer(previousPosition); // プレイヤーの位置をハイライト
    checkSpecialSquares(); // 特別なマスをチェック
    finishu(); // ゲームクリアをチェック
}

// サイコロの出目を取得する関数
function getDiceRoll(roll) {
    if (doubleRoll) { // サイコロの目が2倍になる場合
        roll *= 2;
        doubleRoll = false; // フラグをリセット
    }
    return roll; // サイコロの出目を返す
}

// プレイヤーをリセットする関数
function resetPlayer() {
    const previousPosition = playerPosition; // 前の位置を保存
    playerPosition = 1; // プレイヤーの位置を初期化
    playerHP = maxHP; // HPを初期化
    playerItems = []; // アイテムを初期化
    playerCoins = 0; // コインを初期化
    updateDisplays('-'); // ステータス表示を更新
    highlightPlayer(previousPosition); // プレイヤーの位置をハイライト
    document.getElementById("diceBtn").textContent = 'サイコロを振る'; // サイコロボタンのテキストをリセット
    clearInterval(timerId); // サイコロのアニメーションを停止
}

// 画面表示を更新する関数
function updateDisplays(roll = '-') {
    updateDisplay("dice-result", `サイコロの目: ${roll}`);
    updateDisplay("player-position", `プレイヤーの位置: ${playerPosition}`);
    updateDisplay("player-hp", `HP: ${playerHP}`);
    updateDisplay("player-items", `アイテム: ${playerItems.length > 0 ? playerItems.join(", ") : "なし"}`);
    updateDisplay("player-coins", `コイン: ${playerCoins}`);
    updateDisplay("player-score", `スコア: ${score}`);
}

// 特定の要素のテキストを更新する関数
function updateDisplay(id, text) {
    document.getElementById(id).textContent = text; // 要素のテキストを更新
}

// 特別なマスに止まったかどうかをチェックする関数
function checkSpecialSquares() {
    const currentSquare = document.getElementById(`square-${playerPosition}`); // 現在のマスを取得
    if (currentSquare.classList.contains('recovery')) {
        triggerRecovery(20); // 回復マスの場合、回復イベントを発動
    } else if (currentSquare.classList.contains('happening')) {
        triggerHappeningEvent(); // ハプニングマスの場合、ハプニングイベントを発動
    } else if (currentSquare.classList.contains('quiz')) {
        triggerQuizEvent(); // クイズマスの場合、クイズイベントを発動
    }
}

// 回復マスのイベントを発動する関数
function triggerRecovery(amount) {
    alert(`ラッキー！マス${playerPosition}でHPが${amount}回復！スコア＋10`);
    playerHP = Math.min(maxHP, playerHP + amount); // HPを回復
    updateDisplay("player-hp", `HP: ${playerHP}`); // HP表示を更新
    score += 10;
    updateDisplay("player-score", `スコア: ${score}`);
}


// ハプニングイベントを発動する関数
// triggerHappeningEvent関数を追加
function triggerHappeningEvent() {

    switch (dialogIndex) {
        case 1:
            document.getElementById('story-dialogue1').style.display = 'flex'; // ストーリーを表示
            dialogIndex++;
            // パターン1に関連するコードをここに追加
            break;
        case 2:
            document.getElementById('story-dialogue2').style.display = 'flex'; // ストーリーを表示
            dialogIndex++;
            // パターン2に関連するコードをここに追加
            break;
        case 3:
            document.getElementById('story-dialogue3').style.display = 'flex'; // ストーリーを表示
            dialogIndex++;
            // パターン3に関連するコードをここに追加
            break;
        case 4:
            document.getElementById('story-dialogue4').style.display = 'flex'; // ストーリーを表示
            dialogIndex++;
            // パターン4に関連するコードをここに追加
            break;
        case 5:
            document.getElementById('story-dialogue5').style.display = 'flex'; // ストーリーを表示
            // パターン5に関連するコードをここに追加
            break;
        default:
            console.log("無効なパターンです");
            // 無効なパターンに対する処理
            break;
    }
    
    
    document.body.classList.add('modal-open'); // モーダルオープンのクラスを追加
}

function closeStory1(){
    document.getElementById('story-dialogue1').style.display = 'none'; // ストーリーを非表示
    document.body.classList.remove('modal-open'); // モーダルオープンのクラスを削除
}
function closeStory2(){
    document.getElementById('story-dialogue2').style.display = 'none'; // ストーリーを非表示
    document.body.classList.remove('modal-open'); // モーダルオープンのクラスを削除
}
function closeStory3(){
    document.getElementById('story-dialogue3').style.display = 'none'; // ストーリーを非表示
    document.body.classList.remove('modal-open'); // モーダルオープンのクラスを削除
}
function closeStory4(){
    document.getElementById('story-dialogue4').style.display = 'none'; // ストーリーを非表示
    document.body.classList.remove('modal-open'); // モーダルオープンのクラスを削除
}
function closeStory5(){
    document.getElementById('story-dialogue5').style.display = 'none'; // ストーリーを非表示
    document.body.classList.remove('modal-open'); // モーダルオープンのクラスを削除
}


// ハプニングイベントを作成する関数
function createHappening(message, effect) {
    return { message, effect };
}

// プレイヤーを指定のマス数だけ移動させる関数
function movePlayerBy(amount) {
    playerPosition = Math.max(1, Math.min(playerPosition + amount, 30)); // プレイヤーの新しい位置を計算
    updateDisplay("player-position", `プレイヤーの位置: ${playerPosition}`); // 位置表示を更新
    checkSpecialSquares(); // 特別なマスをチェック
    highlightPlayer(); // プレイヤーの位置をハイライト
    finishu(); // ゲームクリアをチェック
}

// アイテムを追加する関数
function addItem(item) {
    playerItems.push(item); // アイテムを追加
    updateDisplay("player-items", `アイテム: ${playerItems.join(", ")}`); // アイテム表示を更新
    score += 10;
    updateDisplay("player-score", `スコア: ${score}`);
}

// HPを変更する関数
function changeHPBy(amount) {
    playerHP = Math.max(0, Math.min(playerHP + amount, maxHP)); // HPを変更
    updateDisplay("player-hp", `HP: ${playerHP}`); // HP表示を更新
    checkGameOver(); // HPが0になったかどうかをチェック
}

// HPが0になったかどうかをチェックする関数
function checkGameOver() {
    if (playerHP === 0) {
        showGameOver(); // HPが0になった場合の処理
    }
}

// ゲームオーバー時の処理を行う関数
function showGameOver() {
    window.location.href = '../gameover/gameover.html';
    alert("hpが0になりました・・・");
    //resetPlayer(); // プレイヤーをリセット
}

// コインを追加する関数
function addCoins(amount) {
    playerCoins += amount; // コインを追加
    updateDisplay("player-coins", `コイン: ${playerCoins}`); // コイン表示を更新
    score += 5;
    updateDisplay("player-score", `スコア: ${score}`);
}

// 全角数字を半角数字に変換する関数
function toHalfWidth(str) {
    return str.replace(/[！-～]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
    }).replace(/　/g, " "); // 全角スペースを半角スペースに変換
}

// クイズの問題リスト
let quizzes = [
    createQuiz("地球の直径は約何キロメートルでしょうか？", ["10,000km", "12,000km", "15,000km", "18,000km"], 1, "コイン", 10, "HP減少"),
    createQuiz("猫の平均寿命は何年でしょうか？", ["10年", "12年", "15年", "20年"], 2, "落とし物", null, "2マス戻る"),
    createQuiz("7 x 8 はいくつですか？", ["54", "56", "58", "60"], 1, "HP回復", null, "HP減少"),
    createQuiz("日本の首都はどこでしょうか？", ["大阪", "京都", "東京", "名古屋"], 2, "コイン", 5, "HP減少"),
    createQuiz("太陽系で最も大きい惑星は何でしょうか？", ["地球", "火星", "木星", "土星"], 2, "HP回復", null, "2マス戻る"),
    createQuiz("世界で最も高い山は何でしょうか？", ["エベレスト", "キリマンジャロ", "マッキンリー", "アコンカグア"], 0, "落とし物", null, "HP減少")
];

let askedQuizzes = []; // 出題済みのクイズ問題を管理する配列

// クイズを出題する関数
function triggerQuizEvent() {
    // 未出題のクイズ問題があるか確認
    if (quizzes.length === askedQuizzes.length) {
        alert("すべてのクイズ問題が出題済みです。");
        return;
    }

    let quiz;
    do {
        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    } while (askedQuizzes.includes(quiz));

    askedQuizzes.push(quiz); // 選ばれたクイズ問題を出題済みに追加

    let playerAnswerRaw;
    do {
        playerAnswerRaw = prompt(`${quiz.question}\n1: ${quiz.choices[0]}\n2: ${quiz.choices[1]}\n3: ${quiz.choices[2]}\n4: ${quiz.choices[3]}`);
    } while (playerAnswerRaw === null);

    const playerAnswer = parseInt(toHalfWidth(playerAnswerRaw), 10) - 1;

    if (playerAnswer === quiz.correct) {
        handleCorrectAnswer(quiz); // 正解の場合の処理
    } else {
        handleIncorrectAnswer(quiz); // 不正解の場合の処理
    }
}


// クイズを作成する関数
function createQuiz(question, choices, correct, reward, rewardAmount, penalty) {
    return { question, choices, correct, reward, rewardAmount, penalty };
}

// クイズに正解した場合の処理
function handleCorrectAnswer(quiz) {
    alert("正解です！");
    if (quiz.reward === "HP回復") {
        changeHPBy(20); // HPを回復
    } else if (quiz.reward === "コイン") {
        addCoins(quiz.rewardAmount); // コインを追加
    } else {
        addItem(quiz.reward); // アイテムを追加
    }
}

// クイズに不正解した場合の処理
function handleIncorrectAnswer(quiz) {
    alert("不正解です！");
    if (quiz.penalty === "HP減少") {
        changeHPBy(-10); // HPを減少
    } else if (quiz.penalty === "2マス戻る") {
        movePlayerBy(-2); // 2マス戻る
    }
}

// プレイヤーを指定のマスに移動させる関数を更新
function luckyChance() {
    const targetRaw = prompt(`移動したいマス番号を入力してください（${playerPosition + 1}-${Math.min(30, playerPosition + 10)}）`);
    const target = parseInt(toHalfWidth(targetRaw), 10);

    if (!isNaN(target) && target > playerPosition && target <= playerPosition + 10 && target <= 30) {
        movePlayerBy(target - playerPosition); // プレイヤーを指定のマスに移動
    } else {
        alert("無効な入力です。もう一度サイコロを振ってください。"); // 無効な入力の場合の処理
    }
}

// プレイヤーの位置をハイライトする関数を更新
function highlightPlayer() {
    document.querySelectorAll(".square").forEach(square => {
        const squareId = parseInt(square.id.substring(7), 10); // マスのIDを取得
        square.classList.remove("highlight"); // ハイライトを削除
        square.textContent = squareId === 1 ? "スタート" : squareId === 30 ? "ゴール" : squareId;
    });
    const currentSquare = document.getElementById(`square-${playerPosition}`);
    currentSquare.classList.add("highlight"); // 現在のマスをハイライト
    currentSquare.textContent = "プレイヤー"; // プレイヤーの位置を表示
}

// サイコロの画像ファイルのパスを配列に格納
let diceArry = [
    'img/d1.png', // サイコロ1の画像URLを指定
    'img/d2.png', // サイコロ2の画像URLを指定
    'img/d3.png', // サイコロ3の画像URLを指定
    'img/d4.png', // サイコロ4の画像URLを指定
    'img/d5.png', // サイコロ5の画像URLを指定
    'img/d6.png'  // サイコロ6の画像URLを指定
];

const dice = document.getElementById("dice");
const diceBtn = document.getElementById("diceBtn");
dice.src = diceArry[0]; // 初期のサイコロ画像を設定

// サイコロボタンのクリックイベントを設定
diceBtn.addEventListener("click", function () {
    if (diceBtn.textContent === 'サイコロを振る') {
        diceBtn.textContent = 'ストップ'; // ボタンのテキストを変更
        timerId = setInterval(() => {
            let diceIndex = Math.floor(Math.random() * diceArry.length);
            dice.src = diceArry[diceIndex]; // サイコロの画像を変更
        }, 100);
    } else {
        diceBtn.textContent = 'サイコロを振る'; // ボタンのテキストをリセット
        clearInterval(timerId); // サイコロのアニメーションを停止
        let deme = Math.floor(Math.random() * 6) + 1;
        dice.src = diceArry[deme - 1]; // 出目に対応するサイコロの画像を設定
        movePlayer(deme); // プレイヤーを移動
    }
});


///bgm
document.getElementById('start-button').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
});

// BGMの切り替え関数
function switchBGM(newSrc) {
    var bgm = document.getElementById('bgm');
    bgm.pause(); // 現在のBGMを停止
    bgm.src = newSrc; // 新しいBGMのソースを設定
    bgm.play(); // 新しいBGMを再生
}

// 例えばボタンがクリックされたらBGMを切り��える
document.getElementById('switch-button').addEventListener('click', function() {
    switchBGM('bgm/maou_bgm_fantasy12.mp3'); // 切り替えたいBGMのパスを指定
});

