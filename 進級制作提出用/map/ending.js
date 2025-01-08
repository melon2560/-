const dialogues = [
    {},
    { character: 'rumi', text: 'ついにゴールだね！みんな、お疲れさま！今日は本当に楽しい1日だったね！' },
    { character: 'hou', text: 'そうだね。ゴールにたどり着いたのは、みんなが協力してくれたおかげだよ。' },
    { character: 'rumi', text: '森のみんなも集まってくれて、こんなににぎやかなお茶会になるなんて思わなかったな。' },
    { character: 'hou', text: 'よーし、せっかくだし、改めてお祝いしよう！みんなで乾杯しようよ！' },
    { character: 'animal', text: '乾杯〜〜〜！' },
    { character: 'rumi', text: 'これからも、みんなで楽しい時間をたくさん作っていこうね！' },
    { character: 'hou', text: 'うん。森でまた冒険するときは、ぜひ一緒に遊ぼう！' }
];

let currentDialogue = 0;

document.getElementById('startButton').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('dialogueArea').style.display = 'block';
    showDialogue();
});

document.body.addEventListener('click', function() {
    // startButtonが表示されている場合は何もしない
    if (document.getElementById('startButton').style.display !== 'none') {
        return;
    }

    currentDialogue++;
    if (currentDialogue < dialogues.length) {
        showDialogue();
    } else {
        document.getElementById('dialogueArea').style.display = 'none';
        document.getElementById('nextButton').style.display = 'block';
    }
});

document.getElementById('nextButton').addEventListener('click', function() {
    window.location.href = 'staffroll.html';
});

function showDialogue() {
    const dialogue = dialogues[currentDialogue];
    const characterImage = document.getElementById('characterImage');
    const dialogueText = document.getElementById('dialogueText');
    
    characterImage.src = `img/${dialogue.character}.png`;
    dialogueText.textContent = dialogue.text;
}
