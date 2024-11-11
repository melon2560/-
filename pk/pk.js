document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const ball = document.querySelector('.ball');
    const keeper = document.querySelector('.keeper');
    const message = document.getElementById('message');
    const goalWidth = 300;
    const goalHeight = 200;
    const sectionWidth = goalWidth / 3;
    const sectionHeight = goalHeight / 2;
    const keeperPositions = Array.from({ length: 6 }, (_, i) => ({
        left: (i % 3) * sectionWidth + sectionWidth / 2 - 25,
        bottom: (Math.floor(i / 3) === 0 ? goalHeight / 2 : 0) + sectionHeight / 2 - 25,
    }));
    const ballStartBottom = -50; // ボールの初期位置

    let goalCount = 0;
    let ballCount = 10;
    let isClickable = true; // 追加: クリック可能フラグ

    let score = parseInt(localStorage.getItem('score'), 10);

    const counter = document.createElement('div');
    counter.style.position = 'absolute';
    counter.style.top = '10px';
    counter.style.right = '10px';
    counter.style.color = 'white';
    counter.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    counter.style.padding = '10px';
    counter.style.borderRadius = '5px';
    counter.style.fontSize = '16px';
    document.body.appendChild(counter);
    counter.textContent = `残りボール: ${ballCount} ゴール: ${goalCount}`;

    const gameOverDialog = document.getElementById('gameOverDialog');
    const finalScore = document.getElementById('finalScore');
    const nextMapButton = document.getElementById('nextMapButton');

    nextMapButton.addEventListener('click', () => {
        // 次のマップへの移動処理
        window.location.href = '../u-22(map2)/u-22_map2.html'; // 次のマップのURLに変更してください
    });

    keeper.style.left = `${keeperPositions[0].left}px`;
    keeper.style.bottom = `${keeperPositions[0].bottom}px`;

    sections.forEach(section => {
        section.addEventListener('click', () => {
            if (!isClickable || ballCount <= 0) {
                return;
            }

            isClickable = false; // クリックを無効化
            var bgm = document.getElementById('bgm');
            bgm.play();

            const sectionIndex = parseInt(section.dataset.section, 10);
            const ballLeftPosition = (sectionIndex % 3) * sectionWidth + sectionWidth / 2 - 15;
            const ballBottomPosition = keeperPositions[sectionIndex].bottom + (sectionHeight * 1.5);

            ball.style.transition = 'bottom 0.5s, left 0.5s';
            ball.style.bottom = `${ballBottomPosition}px`;
            ball.style.left = `${ballLeftPosition}px`;

            const keeperIndex = Math.floor(Math.random() * 6);
            const keeperPosition = keeperPositions[keeperIndex];

            setTimeout(() => {
                keeper.style.transition = 'bottom 0.5s, left 0.5s';
                keeper.style.left = `${keeperPosition.left}px`;
                keeper.style.bottom = `${keeperPosition.bottom}px`;
            }, 10);

            setTimeout(() => {
                ballCount--;

                if (sectionIndex === keeperIndex) {
                    message.textContent = 'セーブされました！';
                    message.style.color = 'red';
                } else {
                    goalCount++;
                    message.textContent = 'ゴール！';
                    message.style.color = 'green';
                }

                counter.textContent = `残りボール: ${ballCount} ゴール: ${goalCount}`;

                setTimeout(() => {
                    ball.style.transition = 'bottom 0.5s, left 0.5s';
                    ball.style.bottom = `${ballStartBottom}px`;
                    ball.style.left = 'calc(50% - 15px)';
                    keeper.style.bottom = '10px';

                    setTimeout(() => {
                        isClickable = true; // ボールが初期位置に戻った後にクリックを有効化
                    }, 500); // ボールの戻るアニメーションの時間に合わせて調整
                }, 1000);

                if (ballCount <= 0) {
                    finalScore.textContent = `${goalCount}`;
                    const sscoo = goalCount * 2;
                    score += sscoo;
                    localStorage.setItem('score', score);
                    kasanScore.textContent = `${score}`;
                    gameOverDialog.style.display = 'flex';
                }
            }, 500);
        });
    });
});

