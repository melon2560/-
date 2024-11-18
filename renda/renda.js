document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const message = document.getElementById("message");
    const countDisplay = document.getElementById("countDisplay");
    let clickCount = 0;
    let gameActive = false;
    let countdownInterval;
    let countdownActive = false;

    startButton.addEventListener("click", () => {
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
                    message.textContent = "スペースキーを連打！ 残り時間: 10秒";

                    gameActive = true;
                    let timeLeft = 10;
                    countdownInterval = setInterval(() => {
                        message.textContent = `スペースキーを連打！ 残り時間: ${timeLeft}秒`;
                        timeLeft--;

                        if (timeLeft < 0) {
                            clearInterval(countdownInterval);
                            gameActive = false;
                            countdownActive = false;
                            startButton.style.display = "none";
                            message.textContent = `時間切れ！あなたの連打数は ${clickCount} です。`;
                            document.removeEventListener("keydown", handleSpaceKey);
                        }
                    }, 1000);
                }
            }, 1000);

            document.addEventListener("keydown", handleSpaceKey);
        }
    });

    function handleSpaceKey(event) {
        if (gameActive && event.code === "Space") {
            clickCount++;
            countDisplay.textContent = `連打数: ${clickCount}`;
        }
    }
});
