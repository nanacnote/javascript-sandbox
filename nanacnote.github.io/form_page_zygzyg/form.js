// collection of elements needed to be manipulated
var popupBox = document.getElementById("hidden-popup-boxes");
var navSection = document.getElementById("nav-section");
var body = document.getElementsByTagName("body");
var aboutLink = document.getElementsByClassName("rec-links");
var aboutBox = document.getElementsByClassName("about-box");
var aboutBoxClose = document.querySelector(".about-box-close");
var sigupLink = document.querySelector(".signup-link");
var signupForm = document.getElementById("signup-form")
var formBoxClose = document.querySelector(".form-box-close")

// about popup box controls
aboutLink[0].addEventListener("click", showAboutMenu);
aboutBoxClose.addEventListener("click", hideAboutMenu);

function showAboutMenu(){
    popupBox.setAttribute("style", "display: block");
    aboutBox[0].classList.add("open-about");
}

function hideAboutMenu(){
    popupBox.setAttribute("style", "display: none");
    aboutBox[0].classList.remove("open-about");
}

// sigup form popup controls
window.addEventListener("load", showSignupForm);
sigupLink.addEventListener("click", showSignupForm);
formBoxClose.addEventListener("click", hideSignupForm);

function showSignupForm(){
    signupForm.classList.add("signup-form-popup");
}

function hideSignupForm(){
    signupForm.classList.remove("signup-form-popup");
}