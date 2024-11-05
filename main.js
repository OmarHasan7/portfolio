import './style.css';
import throttle from 'lodash.throttle';



let tabs = document.querySelectorAll('.aboutme-btn');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if(window.innerWidth < 710) {
      tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center"});
    }

    let oldActive = document.querySelector('.btn-border-buttom');
    if(oldActive) {
      oldActive.classList.remove('btn-border-buttom');
    }

    if(!tab.querySelector('#resume-btn')) {
      tab.classList.add('btn-border-buttom');
    }
    
    let displayDiv = document.querySelector('#aboutme-info');
    for(let i =0; i < displayDiv.children.length; i++) {
      displayDiv.children[i].style.display = 'none';
    }
    let info = document.querySelector(tab.getAttribute('data-target'));
    info.style.display = 'block';
  });
});

//hamburger btn
let burgerBtn = document.querySelector('.burger-btn');
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  let nav = document.querySelector('.nav');
  nav.classList.toggle('nav-active');
});


//Hide-Show navbar onscroll
// window.onscroll = function() {
//   throttledFunction();
// };

// function throttle(callback, wait, immediate = false) {
//   let timeout = null 
//   let initialCall = true
  
//   return function() {
//     const callNow = immediate && initialCall
//     const next = () => {
//       callback.apply(this, arguments)
//       timeout = null
//     }
    
//     if (callNow) { 
//       initialCall = false
//       next()
//     }

//     if (!timeout) {
//       timeout = setTimeout(next, wait)
//     }
//   }
// }

let lastScrollTop = 0;
function getScrollDirection() {
    let direction = null;
    let st = window.pageYOffset;
    let nav = document.querySelector('nav');
    if (st < lastScrollTop){
      // Scrolling up
      nav.classList.add('fixed-nav');      
      console.log('User scrolling up');
    } else {
      // Scrolling down
      nav.classList.remove('fixed-nav');
      console.log('User scrolling down');
    }

    lastScrollTop = st;
    // return direction;
}

let throttledFunction = throttle(getScrollDirection, 200, {'leading': false});
window.addEventListener('scroll', throttledFunction);


// let heroBtn = document.querySelector('#hero-btn');
// heroBtn.addEventListener('click', () => {
//   let nav = document.querySelector('nav');
//   nav.classList.remove('fixed-nav');
//   lastScrollTop = 0;
// });

// light/dark switch
let switcher = document.querySelector('#theme-switch');
switcher.addEventListener('click', () => {
  if(switcher.getAttribute('data-mode') === 'light') {
    document.body.classList.add('dark-theme');
    document.querySelector('#moon-icon').style.display = 'none';
    document.querySelector('#sun-icon').style.display = 'inline';
    switcher.setAttribute('data-mode', 'dark');
  }
  else if(switcher.getAttribute('data-mode') === 'dark') {
    document.body.classList.remove('dark-theme');
    document.querySelector('#sun-icon').style.display = 'none';
    document.querySelector('#moon-icon').style.display = 'inline';
    switcher.setAttribute('data-mode', 'light');
  }
});