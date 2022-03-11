const back = document.querySelectorAll(".back");
const hello = document.querySelector(".transition-hello");
const left_box = document.getElementById("left-box");
const right_box_1 = document.getElementById("right-box-1");
const right_box_2 = document.getElementById("right-box-2");
const right_box_3 = document.getElementById("right-box-3");
const right_box_4 = document.getElementById("right-box-4");

window.addEventListener("load",() => {
    back[0].classList.add("transition-back-s");
    back[1].classList.add("transition-back-s");
    hello.classList.add("transition-hello-s");
    left_box.classList.add("transition-left-s");
    right_box_1.classList.add("transition-1-y");
    right_box_2.classList.add("transition-1-x");
    right_box_3.classList.add("transition-1-x");
    right_box_4.classList.add("transition-1-y");
});