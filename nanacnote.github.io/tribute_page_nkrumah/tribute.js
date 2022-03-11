// DOM MANUPULATION FUNCTIONS
// -----------------------------
// assign all the nodes which needs to have js applied on to a variable name (cammel case) equivalent to the id or class
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var readMore = document.getElementById("read-more");
var bioLinks = document.getElementsByClassName("bioLinks");
var linkContent = document.getElementsByClassName("link-content");

// attach events listener to all required elements and point to the needed function
icon1.onclick = menuOpen;
icon2.onclick = menuClose;

function menuOpen(){
    // part of function for making visble the menu
    icon1.classList.remove("menu-icon");
    icon1.classList.add("more-info");
    icon2.classList.add("cancel-icon");
    // part of the function for adding the biographical links
    for (var i = 0; i < bioLinks.length; i++) {
        bioLinks[i].classList.add("bio-links");
     }
}

function menuClose(){
    // function for closing biographic data menu
    icon1.classList.remove("more-info");
    icon1.classList.add("menu-icon");
    icon2.classList.remove("cancel-icon");
    readMore.classList.remove("display-read-more");
    // part of the function for erasing the bio-links and bio-info class
    for (var i = 0; i < bioLinks.length; i++) {
        bioLinks[i].classList.remove("bio-links");
        bioLinks[i].classList.remove("bio-info");
        bioLinks[i].classList.remove("sub-bio-links");
        linkContent[i].classList.remove("cur-link-content");
     }
}

// BACKGROUND IMAGE SLIDE SHOW FUNCTION
// ---------------------------------------
// select the target element for image
var backgroundImage = document.getElementById("image");
// select the target element for image caption
var imgCaption = document.getElementById("img-caption");
// create a list of images to shuffle through
var imagesNukrumah = [
    ["images/nkrumah1.jpg","Dr. Nkrumah on an official visit to London"],
    ["images/nkrumah2.jpg","Dr. Nkrumah dancing with Queen Elizabeth"],
    ["images/nkrumah3.jpg","Osagyefo Dr. Nkrumah carried by supporters"]
];
// return an image from the list of "Nkrumah" images after every 20sec
var curImageNukrumah = setInterval(imgShuffle, 20000);

function imgShuffle(){
    // function to change "Nkrumah" image by changing "src" attribute 
    function curImage(){
        // nested function to select random image from a list
        var randomItem = imagesNukrumah[Math.floor(Math.random()*imagesNukrumah.length)];
        while (randomItem){
            imgCaption.innerText = randomItem[1];
            return randomItem[0];
        }
    }
    backgroundImage.setAttribute("src", curImage());
}

// MENU LINKS EXPAND FOR MORE INFO ON CLICK
// -------------------------------------------
// select the target elements ie the bio links and add onclick event listener
for (var i = 0; i < bioLinks.length; i++) {
    if (bioLinks[i].innerText === "Early Life"){
        bioLinks[i].onclick = bioInfoHead;
    }
    if (bioLinks[i].innerText === "Education"){
        bioLinks[i].onclick = bioInfoHead;
    }
    if (bioLinks[i].innerText === "Leadership"){
        bioLinks[i].onclick = bioInfoHead;
    }
    if (bioLinks[i].innerText === "Exile"){
        bioLinks[i].onclick = bioInfoHead;
    }
    if (bioLinks[i].innerText === "Death"){
        bioLinks[i].onclick = bioInfoHead;
    }
 }

function bioInfoHead(){
    //  function for displaying bio information when bio link is clicked
    // this part controls displaying the link when clicked
    for (var i = 0; i < bioLinks.length; i++) {
        bioLinks[i].classList.remove("bio-links");
        bioLinks[i].classList.remove("bio-info");
        bioLinks[i].classList.add("sub-bio-links");
     }
    this.classList.remove("sub-bio-links");
    this.classList.add("bio-info");
    this.classList.add("bio-links");

    // this part controls displaying the content when link is clicked
    if (this.innerText === "Early Life"){
        for (var i = 0; i < bioLinks.length; i++) {
            linkContent[i].classList.remove("cur-link-content");
        }
        linkContent[0].classList.add("cur-link-content");
    }
    if (this.innerText === "Education"){
        for (var i = 0; i < bioLinks.length; i++) {
            linkContent[i].classList.remove("cur-link-content");
        }
        linkContent[1].classList.add("cur-link-content");
    }
    if (this.innerText === "Leadership"){
        for (var i = 0; i < bioLinks.length; i++) {
            linkContent[i].classList.remove("cur-link-content");
        }
        linkContent[2].classList.add("cur-link-content");
    }
    if (this.innerText === "Exile"){
        for (var i = 0; i < bioLinks.length; i++) {
            linkContent[i].classList.remove("cur-link-content");
        }
        linkContent[3].classList.add("cur-link-content");
    }
    if (this.innerText === "Death"){
        for (var i = 0; i < bioLinks.length; i++) {
            linkContent[i].classList.remove("cur-link-content");
        }
        linkContent[4].classList.add("cur-link-content");
    }

    // this part displays the read more button
    readMore.classList.add("display-read-more");
}