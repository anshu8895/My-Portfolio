let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link")
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
var isOpen = false;
var bars = document.querySelector('.fa-solid.fa-bars');

function openmenu() {
    sidemenu.style.right = "0";
    isOpen = true;
    document.addEventListener("click", closeMenuIfClickOutside);
    bars.classList.add('hide');
    console.log(bars);
    if (event) {
        event.stopPropagation();
    }
}

function closemenu() {
    sidemenu.style.right = "-200px";
    isOpen = false;
    document.removeEventListener("click", closeMenuIfClickOutside);
    bars.classList.remove('hide');
}

function closeMenuIfClickOutside(e) {
    if (isOpen && !sidemenu.contains(e.target)) {
        closemenu();
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwtcwVcGeKsXg8azCOEcWq8F7EF5sBoKKtn7Srl-oRSaS7W7_am4Y07DSAtyuK5gzjrPQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 2000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})