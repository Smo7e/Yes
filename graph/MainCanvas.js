const height = 700;
const width = 700;
const prop = width / height;

const WIN = {
    left: -10 * prop,
    bottom: -10,
    width: 20 * prop,
    height: 20,
};
const zoomStep = 1;
let canMove;

const canvas = new Canvas({
    id: "graph",
    width,
    height,
    WIN,
    callbacks: { wheel, mouseUp, mouseDown, mouseMove, mouseLeave },
});

const graph2d = new Graph2d({
    canvas,
    WIN,
});

const ui = new UI({
    changeColor,
    changeWidth,
    addFunction,
    delFunction,
    switchZeroCheckBox,
    switchDerivativeCheckBox,
    createObjectFunc,
    startLine,
    endLine,
});

function wheel(event) {
    const delta = event.wheelDelta > 0 ? -zoomStep : zoomStep;
    if (WIN.width + delta * prop > 0 && WIN.height + delta > 0) {
        WIN.width += prop * delta;
        WIN.height += delta;
        WIN.left -= (prop * delta) / 2;
        WIN.bottom -= delta / 2;
        graph2d.render(event);
    }
}

function mouseUp() {
    canMove = false;
}

function mouseDown() {
    canMove = true;
}

function mouseMove(event) {
    if (canMove) {
        WIN.left -= canvas.sx(event.movementX);
        WIN.bottom -= canvas.sy(event.movementY);
        graph2d.render();
    }
    graph2d.render(event);
}

function mouseLeave() {
    canMove = false;
    graph2d.render();
}

function changeWidth({ num, newWidth }) {
    graph2d.funcs[num].width = newWidth;
    graph2d.render();
}

function changeColor({ num, color }) {
    graph2d.funcs[num].color = color;
    graph2d.render();
}

function switchZeroCheckBox({ num, value }) {
    graph2d.funcs[num].showZero = value;
    graph2d.render();
}

function switchDerivativeCheckBox({ num, value }) {
    graph2d.funcs[num].showDerivative = value;
}

function addFunction({ num, f }) {
    graph2d.funcs[num].f = f;
    graph2d.render();
}

function createObjectFunc(num) {
    graph2d.funcs[num] = {
        f: null,
        color: "black",
        width: 2,
        showZero: false,
        showDerivative: false,
    };
}

function delFunction(num) {
    graph2d.funcs[num] = null;
    graph2d.render();
}
function startLine({ num, sLine }) {
    graph2d.funcs[num].sLine = sLine - 0;
    graph2d.render();
}
function endLine({ num, eLine }) {
    graph2d.funcs[num].eLine = eLine - 0;
    graph2d.render();
}

graph2d.render();
