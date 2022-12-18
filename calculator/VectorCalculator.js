class VectorCalculator {
    constructor(calc = new ComplexCalculator()) {
        this.calc = calc;
    }

    div() {
        return null;
    }
    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    mult(a, b) {
        return new Vector([
            this.calc.sub(this.calc.mult(a.values[1], b.values[2]), this.calc.mult(a.values[2], b.values[1])),
            this.calc.sub(this.calc.mult(a.values[2], b.values[0]), this.calc.mult(a.values[0], b.values[2])),
            this.calc.sub(this.calc.mult(a.values[0], b.values[1]), this.calc.mult(a.values[1], b.values[0])),
        ]);
    }
    prod(p, a) {
        return new Vector(a.values.map((elem) => this.calc.prod(elem, p)));
    }

    pow(a, p) {
        let c = this.one(a.values.length, a.values[0]);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.one());
        }

        return new Vector(values);
    }

    zero(length, elem) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }
}
