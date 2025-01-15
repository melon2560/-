const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultDialog = document.getElementById('result-dialog');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('reset-btn');
const endButton = document.getElementById('end-btn');
const closeButton = document.getElementById('close-btn');
const quizTitle = document.getElementById('quiz-title');
const categoryButtons = document.querySelectorAll('.category-btn');
const categoryContainer = document.getElementById('category-container');
let score = parseInt(localStorage.getItem('score'), 10);

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;
let totalQuestions = 2;  // 出題する問題数を2問に設定

/*const questions = {
    general: [
        {
            question: '新潟県で一番/*高い山はどれですか？',
            answers: [
                { text: '八海山', correct: false },
                { text: '弥彦山', correct: false },
                { text: '小蓮華山', correct: true },
                { text: '富士山', correct: false }
            ]
        },
        {
            question: '新潟県で一番高い建物はどれですか？',
            answers: [
                { text: 'NEXT21', correct: false },
                { text: '万代島ビル', correct: true },
                { text: '新潟日報メディアシップ', correct: false },
                { text: '新潟県庁舎', correct: false }
            ]
        }
    ],
    science: [
        {
            question: '信濃川の長さは？',
            answers: [
                { text: '144km', correct: false },
                { text: '298km', correct: false },
                { text: '367km', correct: true },
                { text: '404km', correct: false }
            ]
        },
        {
            question: '弥彦山の高さは？',
            answers: [
                { text: '334m', correct: false },
                { text: '500m', correct: false },
                { text: '634m', correct: true },
                { text: '1420m', correct: false }
            ]
        }
    ],
    history: [
        {
            question: '新潟県で出土した縄文時代中頃の約5,000年前に作られた国宝にも指定されている土器は？',
            answers: [
                { text: '火焔型土器', correct: true },
                { text: '壺形土器', correct: false },
                { text: '土師器', correct: false },
                { text: '丹波立杭焼', correct: false }
            ]
        },
        {
            question: '新潟県が全国で一番人口が多かったことのある時代は？',
            answers: [
                { text: '明治', correct: true },
                { text: '大正', correct: false },
                { text: '昭和', correct: false },
                { text: '平成', correct: false }
            ]
        }
    ],
    sports: [
        {
            question: '新潟県の駅の利用者数ランキングの4位は何駅？',
            answers: [
                { text: '亀田駅', correct: true },
                { text: '白山駅', correct: false },
                { text: '三条駅', correct: false },
                { text: '越後湯沢駅', correct: false }
            ]
        },
        {
            question: '佐渡汽船のジェットフォイル早く時速何キロで走行することができますか？',
            answers: [
                { text: '50km', correct: false },
                { text: '60km', correct: false },
                { text: '70km', correct: false },
                { text: '80km', correct: true }
            ]
        }
    ],
    pc: [
        {
            question: '佐渡島の面積は次のうちどれ？',
            answers: [
                { text: '855.3 km²', correct: true },
                { text: '755.3 km²', correct: false },
                { text: '1002.3 km²', correct: false },
                { text: '569.3 km²', correct: false }
            ]
        },
        {
            question: '佐渡金山が閉山したのはいつでしょうか？',
            answers: [
                { text: '1916年', correct: false },
                { text: '1977年', correct: false },
                { text: '1989年', correct: true },
                { text: '2000年', correct: false }
            ]
        }
    ],
};*/

const questions = {
    general: [
        {
            question: '日本の首都はどこですか？',
            answers: [
                { text: '大阪', correct: false },
                { text: '京都', correct: false },
                { text: '東京', correct: true },
                { text: '福岡', correct: false }
            ]
        },
        {
            question: '地球は何番目の惑星ですか？',
            answers: [
                { text: '1番目', correct: false },
                { text: '3番目', correct: true },
                { text: '5番目', correct: false },
                { text: '7番目', correct: false }
            ]
        }
    ],
    science: [
        {
            question: '太陽系で最も大きな惑星はどれですか？',
            answers: [
                { text: '地球', correct: false },
                { text: '火星', correct: false },
                { text: '木星', correct: true },
                { text: '金星', correct: false }
            ]
        },
        {
            question: 'プログラミング言語「Python」を開発したのは誰ですか？',
            answers: [
                { text: 'ジェームズ・ゴスリン', correct: false },
                { text: 'デニス・リッチー', correct: false },
                { text: 'グイド・ヴァンロッサム', correct: true },
                { text: 'ブレンダン・アイク', correct: false }
            ]
        }
    ],
    history: [
        {
            question: '第二次世界大戦は何年に終わりましたか？',
            answers: [
                { text: '1945年', correct: true },
                { text: '1939年', correct: false },
                { text: '1918年', correct: false },
                { text: '1965年', correct: false }
            ]
        },
        {
            question: 'フランス革命は何年に始まりましたか？',
            answers: [
                { text: '1789年', correct: true },
                { text: '1776年', correct: false },
                { text: '1804年', correct: false },
                { text: '1815年', correct: false }
            ]
        }
    ],
    sports: [
        {
            question: 'オリンピックのシンボルである五輪のマークは何色の輪で構成されていますか？',
            answers: [
                { text: '赤、青、緑、黄、黒', correct: true },
                { text: '赤、青、白、緑、黒', correct: false },
                { text: '赤、黄、緑、紫、黒', correct: false },
                { text: '赤、青、黄、白、黒', correct: false }
            ]
        },
        {
            question: 'テニスの四大大会の1つ、ウィンブルドンが開催される国はどこですか？',
            answers: [
                { text: 'アメリカ', correct: false },
                { text: 'オーストラリア', correct: false },
                { text: 'フランス', correct: false },
                { text: 'イギリス', correct: true }
            ]
        }
    ],
    pc: [
        {
            question: 'パソコンのCPUは何の略ですか？',
            answers: [
                { text: 'Central Processing Unit', correct: true },
                { text: 'Computer Power Unit', correct: false },
                { text: 'Control Processing Unit', correct: false },
                { text: 'Central Power Unit', correct: false }
            ]
        },
        {
            question: 'グラフィックカードの主な役割は何ですか？',
            answers: [
                { text: 'データの保存と読み込み', correct: false },
                { text: 'インターネット接続の管理', correct: false },
                { text: '画像やビデオの処理と表示', correct: true },
                { text: 'キーボードとマウスの制御', correct: false }
            ]
        }
    ],
};

categoryButtons.forEach(button => {
    button.addEventListener('click', () => selectCategory(button.dataset.category));
});
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        setNextQuestion();
    } else {
        showResultDialog();
    }
});
resetButton.addEventListener('click', resetGame);
//endButton.addEventListener('click', endGame);
closeButton.addEventListener('click', closeDialog);

function selectCategory(category) {
    shuffledQuestions = questions[category].sort(() => Math.random() - .5).slice(0, totalQuestions);
    categoryContainer.classList.add('hide');
    startButton.classList.remove('hide');
}

function startGame() {
    var bgm = document.getElementById('bgm');
    bgm.play();
    startButton.classList.add('hide');
    quizTitle.classList.add('hide');
    resultDialog.classList.add('hide');
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'c-btn', 'circle');
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        correctAnswers++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.classList.remove('c-btn', 'circle'); // アニメーション用のクラスを削除
        button.removeEventListener('click', selectAnswer);
    });
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResultDialog() {
    questionContainerElement.classList.add('hide');
    resultDialog.classList.remove('hide');
    resultDialog.style.display = 'block';
    resultElement.innerText = `あなたは${totalQuestions}問中${correctAnswers}問正解しました。`;
    const sscoo = correctAnswers * 10;
    score += sscoo;
    localStorage.setItem('score', score);
    kasanScore.textContent = `${score}`;

}

function resetGame() {
    resultDialog.classList.add('hide');
    resultDialog.style.display = 'none';
    categoryContainer.classList.remove('hide');
    quizTitle.classList.remove('hide');
}

function endGame() {
    resultDialog.classList.add('hide');
    resultDialog.style.display = 'none';
    alert('クイズを終了します。');
    // 必要ならここで他の終了処理を行います
}

function closeDialog() {
    resultDialog.classList.add('hide');
    resultDialog.style.display = 'none';
    categoryContainer.classList.remove('hide');
    quizTitle.classList.remove('hide');
}

document.getElementById('start-btn').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
});
