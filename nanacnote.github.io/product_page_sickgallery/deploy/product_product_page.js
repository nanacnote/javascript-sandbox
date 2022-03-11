// variables for element selectors
var clickable_item = document.querySelectorAll(".clickable-item");
var major_linksPopup = document.querySelector(".major-nav-links-info");
var major_linksPopup_content = document.querySelector(".nav-links-info-container");
var check_out_link = document.querySelectorAll(".checkout-basket-header, .checkout-basket-footer");
var product_picture = document.querySelectorAll(".grid-item>img, .grid-item>.product-info>div>p:nth-child(4)");
var buy_button = document.querySelectorAll(".buy-button");
var socials_icons = document.querySelectorAll(".instagram-icon, .facebook-icon");

// all variables below product product page
var menu_icon = document.querySelector(".menu-icon-wrapper");
var menu_icon_transition = document.querySelectorAll(".menu-icon");
var sandwich_popup = document.querySelector(".sandwich-icon-popup-menu");


// all function below
function showPopupMajor(){
    var temp = this.textContent; //used to select the right .txt file path
    // http request api
    const xhr = new XMLHttpRequest();
    // console.log(xhr.readyState); //0 -ready 1 -loading 2 -interactive 3 -complete
    // console.dir(xhr) //get all the properties
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.status === 200){
                major_linksPopup_content.innerHTML = xhr.response;
            }else{
                console.log("error occured");
            }
        }
    }

    major_linksPopup.classList.add("is-visible");

    if(this.textContent === "Artist"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    if(this.textContent === "Collection"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    if(this.textContent === "Products"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    if(this.textContent === "Shipping & Returns"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    if(this.textContent === "Terms & Conditions"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    if(this.textContent === "About Us"){
        major_linksPopup_content.classList.remove("is-visible")
        xhr.open("GET", `${temp}_content.txt`);
        xhr.send();
        major_linksPopup_content.classList.add("is-visible")
    }
    
}
function hidePopupMajor(){
    // major links hide popup
    major_linksPopup.classList.toggle("is-visible");
}




// _______________________________________________________________
// select the target node
var target = document.querySelector(".menu-icon"); 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // console.log(mutation.type, mutation.attributeName,mutation.oldValue);
        if (mutation){
            // console.log(sandwich_popup.classList)
            if (sandwich_popup.classList.contains("is-visible")){
                major_linksPopup.style.width = "65%";
            }
        }
    });
});
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
// pass in the target node, as well as the observer options
try {
    observer.observe(target, config);
  }catch(error) {
    console.log(error);
  }
// later, you can stop observing
// observer.disconnect();
// ___________________________________________________________



// PRODUCT PAGE
// ________________________________________________________

// add click listener to clickable objects and perform relevant task using textContent selector
for(i=0; i<clickable_item.length; i++){
    // console.log(i, clickable_item[i].textContent,clickable_item[i]);
    clickable_item[i].style.cursor = "pointer";

    if (clickable_item[i].textContent === "SICK GALLERY"){
        clickable_item[i].addEventListener("click", function(){
            window.location="product.html"
        });
    }
    if(clickable_item[i].textContent === "Artist"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "Collection"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "Products"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "show all"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "Shipping & Returns"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "Terms & Conditions"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
    if(clickable_item[i].textContent === "About Us"){
        clickable_item[i].addEventListener("mouseover", showPopupMajor);
        clickable_item[i].addEventListener("click", hidePopupMajor);
    }
}

// buy and checkout links
for(i=0; i<check_out_link.length; i++){
    check_out_link[i].addEventListener("click", function(){
        window.location="#";
    })
}
for(i=0; i<buy_button.length; i++){
    buy_button[i].addEventListener("click", function(){
        window.location="#";
    })
}

// go to product_product_page on click of product tile pictures
for(i=0; i<product_picture.length; i++){
    product_picture[i].addEventListener("click", function(){
        window.location="product_product_page.html";
    })
}

// socials icons click listener
for(i=0; i<socials_icons.length; i++){
    if(socials_icons[i].isSameNode(document.querySelector(".facebook-icon"))){
        socials_icons[i].addEventListener("click", function(){
            window.location="https://facebook.com";
        })
    }
    if(socials_icons[i].isSameNode(document.querySelector(".instagram-icon"))){
        socials_icons[i].addEventListener("click", function(){
            window.location="https://instagram.com/sickgallery";
        })
    }
} 


// PRODUCT PRODUCT PAGE
// _________________________________________________________

// sandwich popup on hover
for(i=0; i<clickable_item.length; i++){
    if (clickable_item[i].isSameNode(menu_icon)){
        clickable_item[i].addEventListener("click", () => {
            sandwich_popup.classList.toggle("is-visible");
            menu_icon_transition[0].classList.toggle("is-transition");
            menu_icon_transition[1].classList.toggle("is-transition");
            menu_icon_transition[2].classList.toggle("is-transition");
            major_linksPopup.classList.remove("is-visible");
        });
    }
}

