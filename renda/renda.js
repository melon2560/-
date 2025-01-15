document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const message = document.getElementById("message");
    const countDisplay = document.getElementById("countDisplay");
    let clickCount = 0;
    let gameActive = false;
    let countdownActive = false;
    let spaceKeyPressed = false; // スペースキーが押されているかどうかを追跡するフラグ
    let countdownInterval;

    let score = parseInt(localStorage.getItem('score'), 10) || 0; // 初期化を0に設定
    let thisscor = 0;

    let bgmcount = 0;

    startButton.addEventListener("click", () => {
        if(bgmcount == 0){
            var bgm = document.getElementById('bgm');
            bgm.play();
            bgmcount++;
        }
        if (!countdownActive) {
            countdownActive = true;
            clickCount = 0;
            countDisplay.textContent = "連打数: 0";
            message.textContent = "3秒後に連打開始！";
            startButton.disabled = true;

            let countdown = 3;
            countdownInterval = setInterval(() => {
                message.textContent = `${countdown}秒後に連打開始！`;
                countdown--;

                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    message.textContent = "スペースキーで連打開始！ 残り時間: 10秒";

                    gameActive = true;
                    let timeLeft = 2;   //初期時間設定値
                    countdownInterval = setInterval(() => {
                        message.textContent = `スペースキーで連打開始！ 残り時間: ${timeLeft}秒`;
                        timeLeft--;

                        if (timeLeft < 0) {
                            clearInterval(countdownInterval);
                            gameActive = false;
                            countdownActive = false;
                            startButton.style.display = "none";
                            thisscor = Math.floor((clickCount / 10) * 3);
                            score += thisscor;
                            localStorage.setItem('score', score);
                            message.textContent = `時間切れ！あなたの連打数は ${clickCount} です。スコア: ${thisscor} 合計スコア: ${score}`;
                            const continueButton = document.getElementById('continue-button');
                            if (continueButton) {
                                continueButton.style.display = 'block'; // 'flex' に変更も可
                            } else {
                                console.error('continue-button が見つかりません');
                            }
                            document.removeEventListener("keydown", handleSpaceKeyDown);
                            document.removeEventListener("keyup", handleSpaceKeyUp);
                        }
                    }, 1000);
                }
            }, 1000);

            document.addEventListener("keydown", handleSpaceKeyDown);
            document.addEventListener("keyup", handleSpaceKeyUp);
        }
    });

    function handleSpaceKeyDown(event) {
        if (gameActive && event.code === "Space" && !spaceKeyPressed) {
            clickCount++;
            countDisplay.textContent = `連打数: ${clickCount}`;
            spaceKeyPressed = true; // スペースキーが押されていることを記録
        }
    }

    function handleSpaceKeyUp(event) {
        if (event.code === "Space") {
            spaceKeyPressed = false; // スペースキーが離されたことを記録
        }
    }
});
