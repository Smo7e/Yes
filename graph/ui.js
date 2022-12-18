class UI {
    constructor({
        changeColor,
        changeWidth,
        addFunction,
        delFunction,
        switchZeroCheckBox,
        switchDerivativeCheckBox,
        createObjectFunc,
        startLine,
        endLine,
    }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.changeWidth = changeWidth;
        this.changeColor = changeColor;
        this.switchDerivativeCheckBox = switchDerivativeCheckBox;
        this.switchZeroCheckBox = switchZeroCheckBox;
        this.createObjectFunc = createObjectFunc;
        this.startLine = startLine;
        this.endLine = endLine;

        this.num = 0;
        document.querySelector(".addFunction").addEventListener("click", () => this.addFunctionHandler());
    }

    addFunctionHandler() {
        this.createObjectFunc(this.num);

        const startLine = document.createElement("input");
        startLine.setAttribute("placeholder", "Начало");
        startLine.dataset.num = this.num;
        startLine.addEventListener("keyup", (event) => this.keyUpStartLineHandler(event));

        const endLine = document.createElement("input");
        endLine.setAttribute("placeholder", "Конец");
        endLine.dataset.num = this.num;
        endLine.addEventListener("keyup", (event) => this.KeyUpEndLineHandler(event));

        const inputFunc = document.createElement("input");
        inputFunc.dataset.num = this.num;
        inputFunc.addEventListener("keyup", (event) => this.keyUpFunctionHandler(event));
        inputFunc.setAttribute("placeholder", "f");

        const inputWidth = document.createElement("input");
        inputWidth.dataset.num = this.num;
        inputWidth.addEventListener("keyup", (event) => this.keyUpWidthHandler(event));
        inputWidth.setAttribute("type", "number");
        inputWidth.setAttribute("placeholder", "Ширина");

        const inputColor = document.createElement("input");
        inputColor.dataset.num = this.num;
        inputColor.addEventListener("keyup", (event) => this.keyUpColorHandler(event));
        inputColor.setAttribute("placeholder", "Цвет");

        const button = document.createElement("button");
        button.innerHTML = "Удалить";
        button.addEventListener("click", () => {
            div.removeChild(funcBlock);
            this.delFunction(inputFunc.dataset.num);
        });
        button.className = "deleteFunc";

        const funcMainInfo = document.createElement("div");
        funcMainInfo.className = "funcMainInfo";
        funcMainInfo.appendChild(inputFunc);
        funcMainInfo.appendChild(inputWidth);
        funcMainInfo.appendChild(inputColor);
        funcMainInfo.appendChild(startLine);
        funcMainInfo.appendChild(endLine);
        funcMainInfo.appendChild(button);

        const zeroInputCheckBox = document.createElement("input");
        zeroInputCheckBox.setAttribute("type", "checkbox");
        zeroInputCheckBox.dataset.num = this.num;
        zeroInputCheckBox.addEventListener("change", (event) => this.changeZeroCheckBoxHandler(event));

        const zeroSpan = document.createElement("span");
        zeroSpan.innerHTML = "Показывать нули";

        const zeroCheckBox = document.createElement("div");
        zeroCheckBox.className = "zeroCheckBox";
        zeroCheckBox.appendChild(zeroInputCheckBox);
        zeroCheckBox.appendChild(zeroSpan);

        const derivativeInputCheckBox = document.createElement("input");
        derivativeInputCheckBox.setAttribute("type", "checkbox");
        derivativeInputCheckBox.dataset.num = this.num;
        derivativeInputCheckBox.addEventListener("change", (event) =>
            this.changeDerivativeCheckBoxHandler(event)
        );

        const derivativeSpan = document.createElement("span");
        derivativeSpan.innerHTML = "Показывать производную";

        const derivativeCheckBox = document.createElement("div");
        derivativeCheckBox.className = "derivativeCheckBox";
        derivativeCheckBox.appendChild(derivativeInputCheckBox);
        derivativeCheckBox.appendChild(derivativeSpan);

        const funcCheckBoxes = document.createElement("div");
        funcCheckBoxes.className = "funcCheckBoxes";
        funcCheckBoxes.appendChild(zeroCheckBox);
        funcCheckBoxes.appendChild(derivativeCheckBox);

        const funcBlock = document.createElement("div");
        funcBlock.className = "funcBlock";
        funcBlock.appendChild(funcMainInfo);
        funcBlock.appendChild(funcCheckBoxes);

        const div = document.querySelector(".funcInputs");
        div.appendChild(funcBlock);

        this.num++;
    }

    keyUpFunctionHandler(event) {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.addFunction({ f: f, num: event.target.dataset.num });
        } catch (e) {
            console.log(e);
        }
    }

    keyUpWidthHandler(event) {
        this.changeWidth({ num: event.target.dataset.num, newWidth: event.target.value });
    }

    keyUpColorHandler(event) {
        this.changeColor({ num: event.target.dataset.num, color: event.target.value });
    }

    changeZeroCheckBoxHandler(event) {
        this.switchZeroCheckBox({ num: event.target.dataset.num, value: event.target.checked });
    }

    changeDerivativeCheckBoxHandler(event) {
        this.switchDerivativeCheckBox({ num: event.target.dataset.num, value: event.target.checked });
    }

    keyUpStartLineHandler(event) {
        this.startLine({ num: event.target.dataset.num, sLine: event.target.value });
    }

    KeyUpEndLineHandler(event) {
        this.endLine({ num: event.target.dataset.num, eLine: event.target.value });
    }
}
