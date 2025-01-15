/*const sentences = [
    { kanji: "今日の天気は晴れですが、明日は雨が降るでしょう。", romaji: "kyounotenkiwaharedesugaashitawaamegafurudeshou" },
    { kanji: "この本はとても面白くて、一気に読んでしまいました。", romaji: "konohonwatotemoomoshirokuiteikkiniyondeshimaimashita" },
    { kanji: "彼は毎朝ジョギングをして健康を保っています。", romaji: "karewamaisajoginguoshitekenkouotamotteimasu" },
    { kanji: "私は新しい趣味として料理を始めました。", romaji: "watashiwaatarashiishumitoshiteryouriwohajimemashita" },
    { kanji: "週末には友達と映画を見に行く予定です。", romaji: "shuumatsuniwatomodachitoeigawominiikuyoteidesu" },
    { kanji: "このレストランの料理はとても美味しいです。", romaji: "konoressutorannoryouriwaotemooishiidesu" },
    { kanji: "彼女は日本語を勉強していて、とても上手です。", romaji: "kanojowanihongobenkyoushiteitetotemojozudesu" },
    { kanji: "昨日の夜は遅くまで仕事をしていました。", romaji: "kinounoyoruwaosokumadeshigotowoshiteimashita" },
    { kanji: "来週の金曜日に友達と旅行に行きます。", romaji: "raishuukinyoubitomodachitoryokouniikimasu" },
    { kanji: "毎日コーヒーを飲むのが私の習慣です。", romaji: "mainichikoohiwononunogawatashinoshuukandesu" }
];*/
const sentences = [
    { kanji: "今日の天気は晴れですが、明日は雨が降るでしょう。", romaji: "a" },
    
];

let currentSentenceIndex = 0;
let startTime;
let timerInterval;

let score = parseInt(localStorage.getItem('score'), 10) || 0; // 初期化を0に設定
let thisscor = 200;

document.getElementById('start-button').addEventListener('click', startCountdown);
document.getElementById('input').addEventListener('input', handleInput);

function startCountdown() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    let countdown = 3;
    const countdownElement = document.getElementById('timer');
    countdownElement.textContent = `${countdown}秒`;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `${countdown}秒`;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    var bgm = document.getElementById('bgm');
    bgm.play();
    currentSentenceIndex = 0;
    startTime = new Date().getTime();
    displaySentence();
    document.getElementById('result').textContent = '';
    document.getElementById('input').disabled = false;
    document.getElementById('input').focus();

    timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = (currentTime - startTime) / 1000;
    document.getElementById('timer').textContent = `${timeElapsed.toFixed(1)}秒`;
}

function handleInput(event) {
    const input = event.target.value;
    const currentSentence = sentences[currentSentenceIndex].romaji;
    
    // 入力が正しい場合のみ反映
    if (input === currentSentence.substring(0, input.length)) {
        updateRomajiDisplay(input);
        if (input === currentSentence) {
            currentSentenceIndex++;
            event.target.value = '';
            if (currentSentenceIndex < sentences.length) {
                displaySentence();
            } else {
                const endTime = new Date().getTime();
                const timeTaken = (endTime - startTime) / 1000;
                if (timeTaken < 120) {
                     // 非常に早い
                    thisscor = 50;
                  } else if (timeTaken >= 120 && timeTaken <= 150) {
                    // 早い
                    thisscor = 30;
                  } else if (timeTaken > 150 && timeTaken <= 180) {
                    // 普通
                    thisscor = 20;
                  } else {
                    // 遅い
                    thisscor = 0;
                  }
                score += thisscor;
                document.getElementById('result').textContent = `お疲れ様でした！タイム: ${timeTaken}秒 スコア: ${thisscor} 合計スコア: ${score}`;
                document.getElementById('input').disabled = true;
                clearInterval(timerInterval);
                //document.getElementById('continue-button').style.display = 'flex';
                localStorage.setItem('score', score);
                //resultDialog.style.display = 'block';
                const continueButton = document.getElementById('continue-button');
                if (continueButton) {
                    continueButton.style.display = 'block'; // 'flex' に変更も可
                } else {
                    console.error('continue-button が見つかりません');
                }
                
            }
        }
    } else {
        // 不正確な入力があった場合は削除
        event.target.value = input.substring(0, input.length - 1);
    }
}

function updateRomajiDisplay(input) {
    const currentSentence = sentences[currentSentenceIndex].romaji;
    let markedRomaji = '';

    for (let i = 0; i < currentSentence.length; i++) {
        if (i < input.length) {
            if (input[i] === currentSentence[i]) {
                markedRomaji += `<span class="correct">${currentSentence[i]}</span>`;
            } else {
                markedRomaji += `<span class="incorrect">${currentSentence[i]}</span>`;
            }
        } else {
            markedRomaji += currentSentence[i];
        }
    }

    document.getElementById('romaji').innerHTML = markedRomaji;
}

function displaySentence() {
    const sentenceObj = sentences[currentSentenceIndex];
    document.getElementById('word').textContent = sentenceObj.kanji;
    document.getElementById('romaji').innerHTML = sentenceObj.romaji;
}

window.onload = () => {
    document.getElementById('title-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
};
