// ゲーム開始処理
function startGame() {
    document.getElementById('prologue-screen').style.display = 'none';
    document.querySelector('.controls').style.display = 'block';
    document.querySelector('.diceContent').style.display = 'block';
}

// サイコロの処理
document.getElementById('diceBtn').addEventListener('click', function() {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice').src = `img/d${diceResult}.png`;
    document.getElementById('dice-result').textContent = `サイコロの目: ${diceResult}`;
});

