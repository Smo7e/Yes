document.getElementById("main-form").addEventListener("submit", oneshoot);
function oneshoot(event) {
    document.querySelector("#resultShoot").innerHTML = "";
    event.preventDefault();
    let el = document.getElementById("main-form");
    let win = shoot(el.x.value - 0, el.y.value - 0);
    document.querySelector("#resultShoot").innerHTML = `Ваш результат: ${win}`;
}
document.getElementById("main-formShooter").addEventListener("submit", moreshoot);
function moreshoot(event) {
    event.preventDefault();
    let el = document.getElementById("main-formShooter");
    let win = shooter(el.count.value - 0, el.min.value - 0, el.max.value - 0);
    document.querySelector("#resultShooter").innerHTML = `Ваш результат: ${win}`;
}

function shootToCenter(x, y) {
    return x === 0 && y === 0 ? 10 : 0;
}
function shootToRomb(x, y) {
    return (x * 2 + y * 2) / 2 <= 1 ? 5 : 0;
}
function shootToCircle(x, y) {
    return x * x + y * y <= 1 ? 2 : 0;
}
function shoot(x, y) {
    return shootToCenter(x, y) || shootToCircle(x, y) || shootToRomb(x, y) || 0;
}
function shooter(count, min, max) {
    var score = 0;
    for (i = 0; i < count; i++) {
        var x = Math.random() * (max - min) + min;
        var y = Math.random() * (max - min) + min;
        score += shoot(x, y);
    }
    return score;
}
