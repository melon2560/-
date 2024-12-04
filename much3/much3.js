document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown');
    const gameScreen = document.getElementById('game-screen');
    const gameBoard = document.getElementById('game-board');
    const movesLeftElement = document.getElementById('moves-left');
    const currentScoreElement = document.getElementById('current-score');
    const endScreen = document.getElementById('end-screen');
    const finalScoreElement = document.getElementById('final-score');
    const endButton = document.getElementById('end-button');
    const tileColors = ['#ff1744', '#fbc02d', '#64dd17', '#00b0ff', '#d500f9'];

    let movesLeft = 2;
    let currentScore = 0;
    let draggedTile = null;
    let targetTile = null;

    function startGame() {
        document.getElementById('opening-screen').style.display = 'none';
        countdownScreen.style.display = 'block';
        let countdown = 3;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownScreen.style.display = 'none';
                gameScreen.style.display = 'block';
                initializeGame();
            }
        }, 1000);
    }

    function initializeGame() {
        movesLeftElement.textContent = movesLeft;
        currentScoreElement.textContent = currentScore;
        createBoard();
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        let boardState = [];
        // ボードを初期化して、3つ以上揃わないようにする
        do {
            boardState = [];
            for (let i = 0; i < 64; i++) {
                const tileColor = tileColors[Math.floor(Math.random() * tileColors.length)];
                boardState.push(tileColor);
            }
        } while (checkForInitialMatches(boardState));

        // ボードにタイルを配置
        boardState.forEach(color => {
            const tile = document.createElement('div');
            tile.style.backgroundColor = color;
            tile.classList.add('draggable');
            tile.setAttribute('draggable', true);
            tile.addEventListener('dragstart', handleDragStart);
            tile.addEventListener('dragover', handleDragOver);
            tile.addEventListener('drop', handleDrop);
            tile.addEventListener('dragend', handleDragEnd);
            gameBoard.appendChild(tile);
        });
    }

    function checkForInitialMatches(boardState) {
        const rows = 8;
        const cols = 8;
        let hasMatch = false;

        // 横方向のマッチチェック
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - 2; col++) {
                const startIndex = row * cols + col;
                const color = boardState[startIndex];
                if (color === boardState[startIndex + 1] && color === boardState[startIndex + 2]) {
                    hasMatch = true;
                }
            }
        }

        // 縦方向のマッチチェック
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows - 2; row++) {
                const startIndex = row * cols + col;
                const color = boardState[startIndex];
                if (color === boardState[startIndex + cols] && color === boardState[startIndex + 2 * cols]) {
                    hasMatch = true;
                }
            }
        }

        return hasMatch;
    }

    function handleDragStart(event) {
        draggedTile = event.target;
        event.target.classList.add('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
        targetTile = event.target;
    }

    function handleDrop(event) {
        event.preventDefault();
        if (targetTile && draggedTile !== targetTile) {
            swapTiles(draggedTile, targetTile);
            if (!checkMatch()) {
                swapTiles(draggedTile, targetTile); // 元に戻す
            } else {
                movesLeft--;
                movesLeftElement.textContent = movesLeft;
                updateScore();
                setTimeout(() => {
                    removeMatchedTiles();
                }, 500); // タイルを消す時間を確保
            }
        }
        targetTile = null;
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging');
        draggedTile = null;
    }

    function swapTiles(tile1, tile2) {
        const tempColor = tile1.style.backgroundColor;
        tile1.style.backgroundColor = tile2.style.backgroundColor;
        tile2.style.backgroundColor = tempColor;
    }

    function checkMatch() {
        let matchFound = false;
        const tiles = Array.from(gameBoard.children);
        const rows = 8;
        const cols = 8;

        // 横方向のマッチ検出
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - 2; col++) {
                const startIndex = row * cols + col;
                const color = tiles[startIndex].style.backgroundColor;
                if (color && color === tiles[startIndex + 1].style.backgroundColor && color === tiles[startIndex + 2].style.backgroundColor) {
                    matchFound = true;
                    markMatchedTiles(startIndex, startIndex + 1, startIndex + 2);
                }
            }
        }

        // 縦方向のマッチ検出
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows - 2; row++) {
                const startIndex = row * cols + col;
                const color = tiles[startIndex].style.backgroundColor;
                if (color && color === tiles[startIndex + cols].style.backgroundColor && color === tiles[startIndex + 2 * cols].style.backgroundColor) {
                    matchFound = true;
                    markMatchedTiles(startIndex, startIndex + cols, startIndex + 2 * cols);
                }
            }
        }

        return matchFound;
    }

    function markMatchedTiles(...indices) {
        indices.forEach(index => {
            gameBoard.children[index].classList.add('matched');
        });
    }

    function removeMatchedTiles() {
        const tiles = Array.from(gameBoard.children);
        let matchedTilesCount = 0; // マッチしたタイルの数をカウント
    
        tiles.forEach(tile => {
            if (tile.classList.contains('matched')) {
                tile.style.backgroundColor = '';
                tile.classList.remove('matched');
                matchedTilesCount++; // マッチしたタイルの数をインクリメント
            }
        });
    
        // スコアを更新
        updateScore(matchedTilesCount);
    
        setTimeout(() => {
            fillEmptyTiles();
            setTimeout(() => {
                if (movesLeft === 0 && !checkMatch()) {
                    endGame(); // 手数が0でかつマッチがない場合に終了
                }
            }, 500); // タイル補充後の状態チェックの遅延
        }, 500);
    }
    
    

    function updateScore(matchedTiles) {
        let points = 0;
        if (matchedTiles >= 3) points = 10;
        if (matchedTiles >= 4) points += 10;
        currentScore += points;
        currentScoreElement.textContent = currentScore;
    }
    

    function fillEmptyTiles() {
        const tiles = Array.from(gameBoard.children);
        for (let col = 0; col < 8; col++) {
            let emptyCount = 0;
            for (let row = 7; row >= 0; row--) {
                const index = row * 8 + col;
                if (!tiles[index].style.backgroundColor) {
                    emptyCount++;
                } else if (emptyCount > 0) {
                    const targetIndex = index + emptyCount * 8;
                    tiles[targetIndex].style.backgroundColor = tiles[index].style.backgroundColor;
                    tiles[index].style.backgroundColor = '';
                    tiles[targetIndex].classList.add('dropping');
                }
            }
            for (let i = 0; i < emptyCount; i++) {
                const index = i * 8 + col;
                tiles[index].style.backgroundColor = tileColors[Math.floor(Math.random() * tileColors.length)];
                tiles[index].classList.add('dropping');
            }
        }
        setTimeout(() => {
            tiles.forEach(tile => tile.classList.remove('dropping'));
            if (checkMatch()) {
                setTimeout(() => {
                    removeMatchedTiles();
                }, 500); // コンボが発生した場合
            }
        }, 500);
    }

    function endGame() {
        gameScreen.style.display = 'none';
        endScreen.style.display = 'block';
        finalScoreElement.textContent = currentScore;
    }

    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', () => {
        window.location.href = 'end.html'; // リダイレクト先のURL
    });
});
