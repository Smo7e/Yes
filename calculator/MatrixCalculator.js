class MatrixCalculator {
    constructor(calc = new ComplexCalculator()) {
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(
            a.values.map((arr, i) => arr.map((elem, j) => this.calc.add(elem, b.values[i][j])))
        );
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => elem - b.values[i][j])));
    }

    mult(a, b) {
        console.log(a, b);
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s = 0;
                for (let k = 0; k < a.values[i].length; k++) {
                    s = s + a.values[i][k] * b.values[k][j];
                }
                values[i][j] = s;
            }
        }
        console.log(values);
        return new Matrix(values);
    }

    prod(p, a) {
        return new Matrix(a.values.map((arr) => arr.map((elem) => this.calc.prod(elem, p))));
    }

    pow(a, p) {
        let c = this.one(a.values.length);

        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
            console.log(c);
        }
        return c;
    }

    one(length) {
        console.log(length);

        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one() : this.calc.zero();
            }
        }
        return new Matrix(values);
    }

    zero(length) {
        console.log(1);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = 0;
            }
        }
        return new Matrix(values);
    }
}
