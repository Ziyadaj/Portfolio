document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'light') {
        const body = document.querySelector('body');
        const img = document.getElementById('img-mode');
        const lightOnImgSrc = 'https://img.icons8.com/external-creatype-glyph-colourcreatype/64/null/external-dark-basic-creatype-glyph-colourcreatype.png';
        img.src = lightOnImgSrc;
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        var nav = document.querySelector(".navbar");
        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
        //if the navbar is scrolled dark, then change it to light
        if (nav.classList.contains('scrolled-dark')) {
            nav.classList.remove('scrolled-dark');
            nav.classList.add('scrolled-light');
        }
    }
    else {
        const body = document.querySelector('body');
        const img = document.getElementById('img-mode');
        const lightOffImgSrc = 'https://img.icons8.com/external-linear-outline-icons-papa-vector/78/null/external-Light-Mode-interface-linear-outline-icons-papa-vector.png';
        img.src = lightOffImgSrc;
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        var nav = document.querySelector(".navbar");
        nav.classList.remove('navbar-light');
        nav.classList.add('navbar-dark');
        if (nav.classList.contains('scrolled-light')) {
            nav.classList.remove('scrolled-light');
            nav.classList.add('scrolled-dark');
        }
        var images = document.getElementsByTagName('img');
        for (var image of images) {
            image.style.filter = 'opacity(0.5) drop-shadow(0 0 0 white) saturate(200%)'; 
        }
        var cards = document.getElementsByClassName('card');
        for (var card of cards) {
            card.classList.add('bg-dark');
        }
    }
    toggleDarkMode();
    scroll();
    navbarColor();

    var btn = document.getElementById('scroll')
    btn.addEventListener('click',function() {
        scrollToTop();
    });
});
function toggleDarkMode() {
    const body = document.querySelector('body');
    var btn = document.getElementById("toggle-mode");
    const img = document.getElementById('img-mode');
    const lightOffImgSrc = 'https://img.icons8.com/external-linear-outline-icons-papa-vector/78/null/external-Light-Mode-interface-linear-outline-icons-papa-vector.png';
    const lightOnImgSrc = 'https://img.icons8.com/external-creatype-glyph-colourcreatype/64/null/external-dark-basic-creatype-glyph-colourcreatype.png';
    btn.addEventListener("click", function() {
    if (body.classList.contains('dark-mode')) {
        img.src = lightOnImgSrc;
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        var nav = document.querySelector(".navbar");
        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
        if (nav.classList.contains('scrolled-dark')) {
            console.log("scrolled dark");
            nav.classList.remove('scrolled-dark');
            nav.classList.add('scrolled-light');
        }
        var images = document.getElementsByTagName('img');
        for (var image of images) {
            image.style.filter = ''; 
        }   
        var cards = document.getElementsByClassName('card');
        for (var card of cards) {
            card.classList.remove('bg-dark');
        }
        localStorage.setItem('theme', 'light');
    } else {
        img.src = lightOffImgSrc;
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        var nav = document.querySelector(".navbar");
        nav.classList.remove('navbar-light');
        nav.classList.add('navbar-dark');
        if (nav.classList.contains('scrolled-light')) {
            console.log("scrolled light");
            nav.classList.remove('scrolled-light');
            nav.classList.add('scrolled-dark');
        }
        var images = document.getElementsByTagName('img');
        for (var image of images) {
            image.style.filter = 'opacity(0.5) drop-shadow(0 0 0 white) saturate(200%)'; 
        }
        var cards = document.getElementsByClassName('card');
        for (var card of cards) {
            card.classList.add('bg-dark');
        }
        localStorage.setItem('theme', 'dark');
        }
    });
  }
   
function scroll() {
    // var about = document.getElementById("about");
    // var projects = document.getElementById("projects");
    // var contact = document.getElementById("contact");
    // about.addEventListener("click", function() {
    // var element = document.getElementById("section-1");
    // element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // console.log("scrolling");
    // });
    // projects.addEventListener("click", function() {
    // var element = document.getElementById("section-2");
    // element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // console.log("scrolling");
    // });
    // contact.addEventListener("click", function() {
    // var element = document.getElementById("section-3");
    // element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // console.log("scrolling");
    // });
}
//scroll to top
function scrollToTop() {
    window.scrollTo(0,0)
}
//switch color of navbar on scroll
function navbarColor() {
    $(function () {
        $(document).scroll(function () {
          var $nav = $(".navbar");
          //check if dark mode is on
          //if it is on, change the color of the navbar to dark
          //if no local storage is set, then the default is light mode
            if (localStorage.getItem('theme') === 'dark') {
                //first remove the light mode class
                $nav.removeClass('scrolled-light');
                $nav.toggleClass('scrolled-dark', $(this).scrollTop() > $nav.height());
            }
            else {
                //first remove the dark mode class
                $nav.removeClass('scrolled-dark');
                $nav.toggleClass('scrolled-light', $(this).scrollTop() > $nav.height());
            }
        });
      });
}
/*
    this is an animation for the portfolio page,
    it is a simple animation that is triggered when the user scrolls down
*/
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
});
const elements = document.querySelectorAll('.hidden');
elements.forEach(el => {observer.observe(el)});

