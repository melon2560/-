/*document.addEventListener("DOMContentLoaded", () => {
    // ゲームクリアメッセージを2秒間表示

    setTimeout(() => {
        document.querySelector('.game-clear').style.display = 'none'; // ゲームクリアメッセージを非表示
        const creditsContainer = document.querySelector('.credits-container');
        creditsContainer.style.display = 'block'; // スタッフロールを表示

        const credits = document.querySelector('.credits');
        const containerHeight = creditsContainer.offsetHeight;
        const creditsHeight = credits.offsetHeight;

        // アニメーションの開始
        credits.style.transition = `transform ${creditsHeight / 100}s linear`; // アニメーションの時間とイージングを設定 (速度調整)
        credits.style.transform = `translateY(${containerHeight}px)`; // スタート位置を設定

        setTimeout(() => {
            // 任意のスクロール終了位置を設定
            const finalPosition = -creditsHeight - 500; // 例えば、終了位置を100ピクセル手前に設定
            credits.style.transform = `translateY(${finalPosition}px)`; // 終了位置を設定
        }, 100); // アニメーションを開始するまでの遅延時間
    }, 2000); // 2秒後にスタッフロールを開始
});*/

function showStafroll(){
    document.querySelector('.game-clear').style.display = 'none'; // ゲームクリアメッセージを非表示
    const creditsContainer = document.querySelector('.credits-container');
    creditsContainer.style.display = 'block'; // スタッフロールを表示

    const credits = document.querySelector('.credits');
    const containerHeight = creditsContainer.offsetHeight;
    const creditsHeight = credits.offsetHeight;

    // アニメーションの開始
    credits.style.transition = `transform ${creditsHeight / 100}s linear`; // アニメーションの時間とイージングを設定 (速度調整)
    credits.style.transform = `translateY(${containerHeight}px)`; // スタート位置を設定

    setTimeout(() => {
        // 任意のスクロール終了位置を設定
        const finalPosition = -creditsHeight - 500; // 例えば、終了位置を100ピクセル手前に設定
           credits.style.transform = `translateY(${finalPosition}px)`; // 終了位置を設定
     }, 100); // アニメーションを開始するまでの遅延時間
}

document.getElementById('start-button').addEventListener('click', function() {
    var bgm = document.getElementById('bgm');
    bgm.play();
    document.getElementById('start-button').style.display = 'none';
});