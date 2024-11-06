document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const timerElement = document.getElementById('timer');
    const statusText = document.getElementById('status-text');
    const rankTable3x3 = document.getElementById('rank-table-3x3');
    const rankTable4x4 = document.getElementById('rank-table-4x4');
    const openingScreen = document.getElementById('opening-screen');
    const container = document.querySelector('.container');

    let score = parseInt(localStorage.getItem('score'), 10);

    // タイトルのアニメーションを追加
    const maskBg = document.querySelector('.mask-bg');
    maskBg.classList.add('is-animated');

    // 2秒後にその他のアニメーションを開始
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animated-text');
        animatedElements.forEach(element => {
            element.classList.add('is-animated');
        });
    }, 500);



    let timer;
    let seconds = 0;
    let isGameStarted = false;
    let puzzleSize = 3;  // デフォルトは3x3のパズル
    let emptyValue;
    let puzzlePieces;

    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        seconds = 0;
        timerElement.textContent = '00:00';
    }

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        puzzleContainer.style.gridTemplateColumns = `repeat(${puzzleSize}, 100px)`;
        puzzleContainer.style.width = `${puzzleSize * 100 + (puzzleSize - 1) * 2}px`;
        puzzleContainer.style.height = `${puzzleSize * 100 + (puzzleSize - 1) * 2}px`;
        puzzlePieces = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => i + 1);
        emptyValue = puzzleSize * puzzleSize;

        puzzlePieces.forEach((value, i) => {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = value === emptyValue ? 'none' : 'url("img/bb.jpg")';   //画像URL
            piece.style.backgroundPosition = getBackgroundPosition(value);
            piece.style.backgroundSize = `${puzzleSize * 100}px ${puzzleSize * 100}px`;  // 画像全体のサイズを設定
            if (value === emptyValue) {
                piece.classList.add('empty');
            }
            piece.dataset.index = i;
            piece.addEventListener('click', () => {
                if (isGameStarted) {
                    movePiece(i);
                    checkIfCompleted();
                }
            });
            puzzleContainer.appendChild(piece);
        });
    }

    function getBackgroundPosition(value) {
        if (value === emptyValue) return 'none';
        const row = Math.floor((value - 1) / puzzleSize);
        const col = (value - 1) % puzzleSize;
        return `-${col * 100}px -${row * 100}px`;
    }

    function movePiece(index) {
        const emptyIndex = puzzlePieces.indexOf(emptyValue);
        const validMoves = [
            emptyIndex - 1,
            emptyIndex + 1,
            emptyIndex - puzzleSize,
            emptyIndex + puzzleSize
        ];

        const isValidMove = validMoves.includes(index) &&
            (Math.abs(index % puzzleSize - emptyIndex % puzzleSize) + Math.abs(Math.floor(index / puzzleSize) - Math.floor(emptyIndex / puzzleSize)) === 1);

        if (isValidMove) {
            [puzzlePieces[index], puzzlePieces[emptyIndex]] = [puzzlePieces[emptyIndex], puzzlePieces[index]];
            renderPuzzle();
            statusText.textContent = '';
        } else {
            statusText.textContent = '移動できません。';
        }
    }

    function renderPuzzle() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        puzzlePieces.forEach((value, i) => {
            pieces[i].style.backgroundImage = value === emptyValue ? 'none' : 'url("img/bb.jpg")';  //画像URL
            pieces[i].style.backgroundPosition = getBackgroundPosition(value);
            pieces[i].style.backgroundSize = `${puzzleSize * 100}px ${puzzleSize * 100}px`;
            if (value === emptyValue) {
                pieces[i].classList.add('empty');
            } else {
                pieces[i].classList.remove('empty');
            }
        });
    }

    function getInversions(arr) {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] !== emptyValue && arr[j] !== emptyValue && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }
        return inversions;
    }

    /*function shufflePuzzle() {
        resetTimer();
        do {
            for (let i = puzzlePieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
            }
        } while (getInversions(puzzlePieces) % 2 !== 0);
        renderPuzzle();
        statusText.textContent = '';
        isGameStarted = true;
        startTimer();
    }*/
    /*******/
    function shufflePuzzle() {
        resetTimer();
        do {
            for (let i = puzzlePieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
            }
        } while (!isSolvable(puzzlePieces)); // パズルが解けない配置にならないことを確認
        renderPuzzle();
        statusText.textContent = '';
        isGameStarted = true;
        startTimer();
    }
    
    function isSolvable(puzzle) {
        const inversions = getInversions(puzzle);
        const emptyIndex = puzzle.indexOf(emptyValue);
        const emptyRowFromBottom = Math.floor(emptyIndex / puzzleSize);
    
        if (puzzleSize % 2 !== 0) {
            // 奇数サイズのパズル: 反転数が偶数である必要がある
            return inversions % 2 === 0;
        } else {
            // 偶数サイズのパズル: 空の位置が影響を与える
            return (emptyRowFromBottom % 2 === 0) ? (inversions % 2 !== 0) : (inversions % 2 === 0);
        }
    }
    
    function getInversions(arr) {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] !== emptyValue && arr[j] !== emptyValue && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }
        return inversions;
    }
    
    /*********/

    function checkIfCompleted() {
        if (puzzlePieces.every((value, index) => value === index + 1)) {
            clearInterval(timer);
            isGameStarted = false;
            const rank = getRank(seconds);
            localStorage.setItem('score', score);
            kasanScore.textContent = `${score}`;
            /*alert(`パズル完成！かかった時間は ${timerElement.textContent} です。ランク: ${rank}`);*/
            const showDialogButton = document.getElementById('showDialog');
            const dialog = document.getElementById('myDialog');
            const closeDialogButton = document.getElementById('closeDialog');
            const a = document.getElementById('diames');
            const bb = document.getElementById('dimes2');
            a.textContent = `パズル完成！`;
            bb.textContent = `かかった時間は ${timerElement.textContent} です。ランク: ${rank}`;

            dialog.showModal();

            closeDialogButton.addEventListener('click', () => {
                dialog.close();
            });
        }
    }

    function getRank(seconds) {
        if (puzzleSize === 3) {
            if (seconds <= 60) {
                score += 30;
                return 'S';
            } else if (seconds <= 120) {
                score += 20;
                return 'A';
            } else if (seconds <= 180) {
                score += 15;
                return 'B';
            } else if (seconds <= 300) {
                score += 10;
                return 'C';
            } else {
                return 'D';
            }
        } else if (puzzleSize === 4) {
            if (seconds <= 240) {
                score += 50;
                return 'S';
            } else if (seconds <= 360) {
                score += 40;
                return 'A';
            } else if (seconds <= 540) {
                score += 30;
                return 'B';
            } else if (seconds <= 720) {
                score += 20;
                return 'C';
            } else {
                return 'D';
            }
        }
    }
    

    document.querySelector('#size-select').addEventListener('change', (event) => {
        const selectedSize = event.target.value;
        if (selectedSize === '3') {
            puzzleSize = 3;
        } else if (selectedSize === '4') {
            puzzleSize = 4;
        }
        createPuzzle();
        renderPuzzle();
    });

    createPuzzle();
    renderPuzzle();

    document.querySelector('#shuffle-button').addEventListener('click', shufflePuzzle);

    document.getElementById('start-button').addEventListener('click', () => {
        const selectedSize = document.querySelector('input[name="puzzle-size"]:checked').value;
        puzzleSize = parseInt(selectedSize, 10);
        if (puzzleSize === 3) {
            rankTable3x3.style.display = 'block';
            rankTable4x4.style.display = 'none';
        } else if (puzzleSize === 4) {
            rankTable3x3.style.display = 'none';
            rankTable4x4.style.display = 'block';
        }
        openingScreen.style.display = 'none';
        container.style.display = 'block';
        createPuzzle();
        shufflePuzzle();
    });

    document.querySelectorAll('.size-button').forEach(button => {
        button.addEventListener('click', (e) => {
            puzzleSize = parseInt(e.target.dataset.size, 10);
            openingScreen.style.display = 'none';
            container.style.display = 'flex';
            if (puzzleSize === 3) {
                rankTable3x3.style.display = 'block';
                rankTable4x4.style.display = 'none';
            } else {
                rankTable3x3.style.display = 'none';
                rankTable4x4.style.display = 'block';
            }
            createPuzzle();
        });
    });
    
});

document.getElementById('start-button').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
});
