document.addEventListener("DOMContentLoaded", function() {
    // BGM要素を取得
    const bgm = document.getElementById('bgm');
    
    // BGM再生ボタンを取得
    const playBgmButton = document.getElementById('play-bgm-button');
    const container = document.getElementById('gameover-container');
    
    playBgmButton.addEventListener('click', function() {
        // BGMを再生
        bgm.play();
        // BGM再生ボタンを非表示にする
        playBgmButton.style.display = 'none';
        // ゲームオーバーコンテナを表示し、アニメーションを開始
        container.style.display = 'block';
        container.style.animation = 'fadeIn 2s ease-in-out, slideIn 2s ease-in-out';
    });

    // ゲームオーバーコンテナのアニメーション終了イベントを設定
    container.addEventListener('animationend', (event) => {
        // アニメーションが終了した後にアニメーションを無効にする
        if (event.animationName === 'fadeIn' || event.animationName === 'slideIn') {
            container.style.animation = 'none';
        }
    });

    // 最初のマップに戻るボタンのクリックイベントを設定
    const retryButton = document.getElementById('retry-button');
    retryButton.addEventListener('click', function() {
        // 初期マップへのURLを設定
        location.href = '../u-22(map1)/u-22_map1.html';
    });
});
