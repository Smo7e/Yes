function operandHandlerCalc(event) {
    const calc = new Calculator();
    const inputA = document.getElementById("a");
    const inputB = document.getElementById("b");
    const a = calc.getEntity(inputA.value);
    const b = calc.getEntity(inputB.value);
    const operand = event.target.dataset.operand;
    const c = calc[operand](a, b);
    inputA.value = c ? c.toString() : "ошибка";
}

function operandHandlerPoly(event) {
    const calc = new PolynomialCalculator();
    const inputP1 = document.getElementById("p1");
    const inputP2 = document.getElementById("p2");
    const a = calc.getPolynomial(inputP1.value);
    const b = calc.getPolynomial(inputP2.value);
    const operand = event.target.dataset.operand;
    const c = calc[operand](a, b);
    inputP1.value = c ? c.toString() : "Ошибка!!!";
}

function operandHandlerResult() {
    const calc = new PolynomialCalculator();
    const a = calc.getPolynomial(document.getElementById("p1").value);
    const inputX = document.getElementById("xCalc");
    const x = new Calculator().getEntity(inputX.value);
    if (a) {
        document.querySelector("#res").innerHTML = a.getValue(x, a).toString();
    }
}

document
    .querySelectorAll(".operand-calc")
    .forEach((button) => button.addEventListener("click", operandHandlerCalc));
document
    .querySelectorAll(".operand-poly")
    .forEach((button) => button.addEventListener("click", operandHandlerPoly));
document
    .querySelectorAll(".operand-result")
    .forEach((button) => button.addEventListener("click", operandHandlerResult));
