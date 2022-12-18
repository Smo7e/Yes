var optionButtons = document.querySelector("#rpgAnswer");

function startQuest() {
    state = {};
    showText(1);
}

function showText(textIndex) {
    var textHost = textHosts.find((textHost) => textHost.id === textIndex);
    rpgQuestions.innerText = textHost.text;

    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }

    textHost.options.forEach((option) => {
        if (showOption(option)) {
            var button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("classAnswer");
            button.addEventListener("click", () => selectOption(option));
            optionButtons.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    var nexttextHostId = option.nextText;
    if (nexttextHostId <= 0) {
        return startQuest();
    }
    state = Object.assign(state, option.setState);
    showText(nexttextHostId);
}
startQuest();
