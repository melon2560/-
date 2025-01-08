
// ページの読み込み後に処理を実行
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('closeDialog');

    button.addEventListener('click', (event) => {
        //event.preventDefault(); // デフォルト動作をキャンセル
        let score = 0;
        let minigemecount = 0; // ミニゲームの順番を指定
        let currentIndex =0;
        localStorage.setItem('game', minigemecount);
        localStorage.setItem('iti', currentIndex);
        localStorage.setItem('score', score);
        location.href = '../map/u-22_map1.html'; // 次のマップへ移動
    });
});
