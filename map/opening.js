const dialogues = [
    {},
    { character: 'rumi', text: 'やっと森が平和になったね。もう、嵐も怖い魔物もいないよ。' },
    { character: 'hou', text: '本当だね。みんなのおかげで森が元の姿を取り戻した。ありがとう、ルミ。' },
    { character: 'rumi', text: 'ううん、ホウだって頑張ったじゃない！それにみんなの協力があったからだよ。' },
    { character: 'hou', text: 'うん……ねえ、せっかくだしみんなで何か楽しいことをしようよ！' },
    { character: 'rumi', text: 'いいね！この前見つけたすごろくゲームをやってみない？森の動物たちもきっと楽しめるよ！' },
    { character: 'hou', text: 'それ最高！よし、準備しよう！みんなが集まるのを待ってるよ！' }
];

let currentDialogue = 0;

document.getElementById('startButton').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
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
    //event.preventDefault(); // デフォルト動作をキャンセル
    let score = 0;
    let minigemecount = 0; // ミニゲームの順番を指定
    let currentIndex =0;
    localStorage.setItem('game', minigemecount);
    localStorage.setItem('iti', currentIndex);
    localStorage.setItem('score', score);
    window.location.href = 'u-22_map1.html';
});

function showDialogue() {
    const dialogue = dialogues[currentDialogue];
    const characterImage = document.getElementById('characterImage');
    const dialogueText = document.getElementById('dialogueText');
    
    characterImage.src = `img/${dialogue.character}.png`;
    dialogueText.textContent = dialogue.text;
}
