class Graph2d {
    constructor({ canvas, WIN }) {
        this.canvas = canvas;
        this.WIN = WIN;
        this.funcs = [];
    }

    printOXY() {
        this.canvas.line({ x1: this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left, y2: 0, width: 3 });
        this.canvas.line({
            x1: 0,
            y1: this.WIN.bottom,
            x2: 0,
            y2: this.WIN.bottom + this.WIN.height,
            width: 3,
        });
    }

    printZeros = ({ f, color = "red", x, dx }) => {
        if (f(x) * f(x + dx) <= 0) {
            this.canvas.point({ x: x + dx / 2, y: 0, color });
        }
    };

    printDerivative({ f, x }) {
        const dx = Math.pow(10, -9);
        if (f instanceof Function) {
            const k = (f(x + dx) - f(x)) / dx;

            const b = f(x) - k * x;
            this.canvas.line({ x1: b, y1: 0, x2: x, y2: f(x), color: "#2F4F4F" });
            this.canvas.line({ x1: x, y1: 0, x2: x, y2: f(x), color: "#2F4F4F" });
        }
    }

    printFunction({ f, color = "black", width = 2, showZero }) {
        const dx = this.WIN.width / 1000;
        let x = this.WIN.left;

        while (x < this.WIN.width + this.WIN.left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < this.WIN.height) {
                this.canvas.line({ x1: x, y1: f(x), x2: x + dx, y2: f(x + dx), color: color, width: width });
                if (showZero) {
                    this.printZeros({ f, x, dx });
                }
            } else {
                this.canvas.line({
                    x1: x,
                    y1: f(x),
                    x2: x + dx,
                    y2: f(x + dx),
                    color: color,
                    width: width,
                    isDash: true,
                });
            }

            x += dx;
        }
    }

    grid(color = "#ccc") {
        for (let i = 0; i <= this.WIN.left + this.WIN.width; i++) {
            this.canvas.line({
                x1: i,
                y1: this.WIN.bottom,
                x2: i,
                y2: this.WIN.bottom + this.WIN.height,
                color: color,
            });
        }
        for (let i = 0; i >= this.WIN.left; i--) {
            this.canvas.line({
                x1: i,
                y1: this.WIN.bottom,
                x2: i,
                y2: this.WIN.bottom + this.WIN.height,
                color: color,
            });
        }
        for (let i = 0; i <= this.WIN.bottom + this.WIN.height; i++) {
            this.canvas.line({
                x1: this.WIN.left,
                y1: i,
                x2: this.WIN.left + this.WIN.width,
                y2: i,
                color: color,
            });
        }
        for (let i = 0; i >= this.WIN.bottom; i--) {
            this.canvas.line({
                x1: this.WIN.left,
                y1: i,
                x2: this.WIN.left + this.WIN.width,
                y2: i,
                color: color,
            });
        }
    }

    printNums() {
        const streakLength = this.WIN.height / (this.WIN.width + 30);
        const len = streakLength / 2;
        const shiftY = -this.WIN.height * 0.01 - 0.04;
        const shiftX = this.WIN.width * 0.001 + 0.04;
        for (let i = Math.round(this.WIN.left); i < this.WIN.left + this.WIN.width; i++) {
            this.canvas.line({ x1: i, y1: len, x2: i, y2: -len, width: 2.5 });
            this.canvas.printText({ text: i, x: i + shiftX, y: shiftY });
        }
        for (let i = Math.round(this.WIN.bottom); i < this.WIN.bottom + this.WIN.height; i++) {
            this.canvas.line({ x1: len, y1: i, x2: -len, y2: i, width: 2.5 });
            this.canvas.printText({ text: i, x: shiftX, y: i + shiftY });
        }
    }

    printRect(event) {
        const x = Math.floor(this.canvas.x(event.offsetX));
        const y = Math.ceil(this.canvas.y(event.offsetY));

        this.canvas.drawRect({ x: x, y: y, width: 1, height: 1, color: "#bd94d4" });

        const shiftY = this.WIN.height * 0.01;
        const shiftX = this.WIN.width * 0.01 + 0.02;

        const nums = [
            { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
            { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
            { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
            { x: 1, y: -1, shiftX: 0, shiftY: -shiftY },
        ];
        nums.forEach((coord) => {
            this.canvas.printText({
                text: `(${coord.x + x}; ${coord.y + y})`,
                x: x + coord.x + coord.shiftX,
                y: y + coord.y + coord.shiftY,
            });
        });
    }
    printIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a;
        const points = [];
        points.push({ x, y: 0 });
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: f(x) });
        points.push({ x: b, y: 0 });
        this.canvas.polygon(points);
    }
    getIntegral(f, a, b, d = 900000) {
        const dx = (b - a) / d;
        let x = a;
        let s = 0;
        while (x < b) {
            s += ((Math.abs(f(x)) + Math.abs(f(x + dx))) * dx) / 2;
            x += dx;
        }
    }
    render = (event = null) => {
        this.canvas.clear();
        if (event) {
            this.printRect(event);
        }
        this.grid();
        this.printNums();
        this.printOXY();
        this.funcs.forEach((func) => {
            if (func?.f instanceof Function) {
                this.printIntegral(func.f, func.sLine, func.eLine);
                this.getIntegral(func.f, func.sLine, func.eLine);
                this.printFunction({
                    f: func.f,
                    color: func.color,
                    width: func.width,
                    showZero: func.showZero,
                });
            }
            if (func.showDerivative) {
                const x = this.canvas.x(event.offsetX);
                this.printDerivative({ f: func.f, x });
            }
        });
    };
}
function sin(x) {
    return Math.sin(x);
}
function cos(x) {
    return Math.cos(x);
}
function tg(x) {
    return Math.tan(x);
}
function asin(x) {
    return Math.asin(x);
}
function acos(x) {
    return Math.acos(x);
}
function atg(x) {
    return Math.atan(x);
}
function sqrt(x) {
    return Math.sqrt(x);
}
