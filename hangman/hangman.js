// script.js
const words = ['javascript', 'hangman', 'coding', 'programmer', 'developer', 'apple'];
let selectedWord = '';
let correctLetters = [];
let incorrectLetters = [];

const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const lettersElement = document.getElementById('letters');
const restartButton = document.getElementById('restart');
const hangmanParts = document.querySelectorAll('.part');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctLetters = [];
    incorrectLetters = [];
    displayWord();
    displayLetters();
    messageElement.textContent = '';
    hangmanParts.forEach(part => part.style.display = 'none');
}

function displayWord() {
    wordElement.innerHTML = selectedWord.split('').map(letter => (
        correctLetters.includes(letter) ? letter : '_'
    )).join(' ');
}

function displayLetters() {
    lettersElement.innerHTML = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const button = document.createElement('span');
        button.textContent = letter;
        button.classList.add('letter');
        if (correctLetters.includes(letter)) {
            button.classList.add('correct');
        } else if (incorrectLetters.includes(letter)) {
            button.classList.add('incorrect');
        } else {
            button.addEventListener('click', () => handleLetterClick(letter));
        }
        lettersElement.appendChild(button);
    });
}

function handleLetterClick(letter) {
    if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
        if (!wordElement.textContent.includes('_')) {
            messageElement.textContent = 'You win!';
        }
    } else {
        incorrectLetters.push(letter);
        hangmanParts[incorrectLetters.length - 1].style.display = 'block';
        if (incorrectLetters.length === hangmanParts.length) { // ?¿½S?¿½Ä‚Ìƒp?¿½[?¿½c?¿½?¿½?¿½\?¿½?¿½?¿½?¿½?¿½ê‚½?¿½?¿½Q?¿½[?¿½?¿½?¿½I?¿½[?¿½o?¿½[
            messageElement.textContent = `You lose! The word was ${selectedWord}`;
        }
    }
    displayLetters();
}

restartButton.addEventListener('click', startGame);

startGame();
