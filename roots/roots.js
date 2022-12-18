var rootsButton = document.getElementById("roots");
rootsButton.addEventListener("click", rootsHandler);
function rootsHandler() {
    var a = document.getElementById("aR").value;
    var b = document.getElementById("bR").value;
    var c = document.getElementById("cR").value;
    var d = document.getElementById("dR").value;
    var e = document.getElementById("eR").value;
    var roots = getRoots(a ? a - 0 : NaN, b ? b - 0 : NaN, c ? c - 0 : NaN, d ? d - 0 : NaN, e ? e - 0 : NaN);
    document.getElementById("rootsResult").innerHTML = roots;
}
function getRoots(a, b, c, d, e) {
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e)) return fourthDegree(a, b, c, d, e);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d)) return Cub(a, b, c, d);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) return square(a, b, c);
    if (!isNaN(a) && !isNaN(b)) return line(a, b);
    return null;
}
function line(a, b) {
    if (a === 0 && b === 0) {
        return "Нет корней";
    }
    if (a === 0) {
        return "Нет корней";
    }
    return "Корень уравнения: " + -b / a;
}
function square(a, b, c) {
    var D = b * b - 4 * a * c;

    if (D < 0) {
        return "Нет корней";
    }
    if (D == 0) {
        return "Корень уравнения: " + (-b / 2) * a;
    }
    if (D > 0) {
        return "Корни уравнения: " + [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
    }
}
function Cub(a, b, c, d) {
    var Dis = -4 * b ** 3 * d + b ** 2 * c ** 2 - 4 * a * c ** 3 + 18 * a * b * c * d - 27 * a ** 2 * d ** 2;
    if (Dis < 0) {
        return "Дискриминант должен равняться 0";
    }
    if (Dis === 0) {
        if (b ** 2 === 3 * a * c) {
            return "Корень уравнения: " + (-b / 3) * a;
        }
        if (b ** 2 != 3 * a * c) {
            return (
                "Корни уравнения: " +
                [
                    ((4 * a * b * c - 9 * a ** 2 * d - b ** 3) / a) * (b ** 2 - 3 * a * c),
                    ((9 * a * d - b * c) / 2) * (b ** 2 - 3 * a * c),
                ]
            );
        }
    }
    if (Dis > 0) {
        return "Дискриминант должен равняться 0";
    }
}

function fourthDegree(a, b, c, d, e) {
    var Dis =
        256 * a ** 3 * e ** 3 -
        192 * a ** 2 * b * d * e ** 2 -
        128 * a ** 2 * c ** 2 * e ** 2 +
        144 * a ** 2 * c * d ** 2 * e -
        27 * a ** 2 * d ** 4 +
        144 * a * b ** 2 * c * e ** 2 -
        6 * a * b ** 2 * d ** 2 * e -
        80 * a * b * c ** 2 * d * e +
        18 * a * b * c * d ** 3 +
        16 * a * c ** 4 * e -
        4 * a * c ** 3 * d ** 2 -
        27 * b ** 4 * e ** 2 +
        18 * b ** 3 * c * d * e -
        4 * b ** 3 * d ** 3 -
        4 * b ** 2 * c ** 3 * e +
        b ** 2 * c ** 2 * d ** 2;
    return "Не удаётся решить уравнение, вот вам его дискриминант: " + Dis;
}
