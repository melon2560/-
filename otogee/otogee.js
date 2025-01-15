document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".game-button");
    const scoreDisplay = document.getElementById("score");
    const music = document.getElementById("music");
    const gameContainer = document.getElementById("game-container");

    let score = 0;
    let currentButton = null;
    let gameInterval = null;

    function getRandomButton() {
        return buttons[Math.floor(Math.random() * buttons.length)];
    }

    function startGame() {
        music.play();
        gameInterval = setInterval(() => {
            if (currentButton) {
                currentButton.classList.remove("active");
            }
            currentButton = getRandomButton();
            currentButton.classList.add("active");
        }, 1000); // Change button every second
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button === currentButton) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                currentButton.classList.remove("active");
                currentButton = null;
            }
        });
    });

    music.addEventListener("ended", () => {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);
    });

    gameContainer.addEventListener("click", () => {
        if (!music.playing) {
            startGame();
        }
    });
});
