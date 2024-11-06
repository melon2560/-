let sscore = 0;
const scoreDisplay = document.getElementById('score');
const holes = document.querySelectorAll('.hole');
let lastHole;
let timeUp = false;
let moleCount = 0;
const maxMoles = 10;

const startButton = document.getElementById('start-button');
const endMessage = document.getElementById('end-message');
const finalScore = document.getElementById('final-score');
const kasanScore = document.getElementById('kasanScore'); // 追加

const opening = document.getElementById('opening');
const openingStartButton = document.getElementById('opening-start-button');
const game = document.getElementById('game');
let score = parseInt(localStorage.getItem('score'), 10) || 0; // 初期化を0に設定

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function showMole() {
    if (moleCount >= maxMoles) {
        timeUp = true;
        checkGameEnd();
        return;
    }
    moleCount++;
    const time = randomTime(500, 1500); //モグラの動きの時間
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('show');
    mole.dataset.hit = 'false'; // モグラが出てきたときにヒットフラグをリセット
    setTimeout(() => {
        mole.classList.remove('show');
        if (!timeUp) {
            showMole();
        } else {
            checkGameEnd();
        }
    }, time);
}

function startGame() {
    sscore = 0;
    moleCount = 0;
    scoreDisplay.textContent = sscore;
    timeUp = false;
    endMessage.classList.add('hidden');
    startButton.classList.add('hidden');
    setTimeout(() => {
        showMole();
    }, 1000); // 3秒のカウントダウン後にゲーム開始
}

function checkGameEnd() {
    const isAnyMoleVisible = Array.from(document.querySelectorAll('.mole')).some(mole => mole.classList.contains('show'));
    if (!isAnyMoleVisible) {
        setTimeout(endGame, 600); // 数字が待ち時間
    } else {
        setTimeout(checkGameEnd, 100);
    }
}

function endGame() {
    finalScore.textContent = sscore;
    const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog');
    const a = document.getElementById('diames');
    const bb = document.getElementById('dimes2');
    a.textContent = `ゲーム終了`;
    bb.textContent = `点数は ${sscore} 点です`;

    const sscoo = sscore * 2;
    score += sscoo;
    localStorage.setItem('score', score);
    kasanScore.textContent = `${score}`;

    dialog.showModal();

    closeDialogButton.addEventListener('click', () => {
        dialog.close();
    });
    endMessage.classList.remove('hidden');
}

function whackMole(e) {
    if (!e.isTrusted) return; // チート防止
    if (this.dataset.hit === 'true') return; // 既に叩かれたモグラは無視
    sscore++;
    this.dataset.hit = 'true'; // ヒットフラグを設定
    this.style.backgroundImage = "url('img/tatakareta.jpg')"; // たたかれたモグラの画像に変更
    setTimeout(() => {
        this.style.backgroundImage = ""; // 0.3秒後に元の画像に戻す
    }, 500);
    
    this.classList.remove('show');
    scoreDisplay.textContent = sscore;
}

openingStartButton.addEventListener('click', () => {
    opening.classList.add('hidden'); // オープニング画面を非表示
    game.classList.remove('hidden'); // ゲーム画面を表示
    startGame(); // ゲーム開始
});

function startGame() {
    sscore = 0;
    moleCount = 0;
    scoreDisplay.textContent = sscore;
    timeUp = false;
    endMessage.classList.add('hidden');
    setTimeout(() => {
        showMole();
    }, 1000); // 3秒のカウントダウン後にゲーム開始
}

holes.forEach(hole => hole.querySelector('.mole').addEventListener('click', whackMole));
//startButton.addEventListener('click', startGame);


document.getElementById('opening-start-button').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
});
