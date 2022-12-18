function menuHandler(event) {
    var contents = document.querySelectorAll(".contentEvent");
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.add("hide");
    }
    var id = event.target.dataset.content;
    document.getElementById(id).classList.remove("hide");
}
let menuButton = document.querySelectorAll(".menu-item");
for (var i = 0; i < menuButton.length; i++) {
    menuButton[i].addEventListener("click", menuHandler);
}
