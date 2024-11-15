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
    setTimeout(() => info.classList.add('fade-in-bottom', 'a-duration-05'), 0);
  });
});

//hamburger btn
let burgerBtn = document.querySelector('.burger-btn');
burgerBtn.addEventListener('click', openCloseNav);

function openCloseNav() {
    burgerBtn.classList.toggle('active');
    let nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');
}

let nav = document.querySelector('nav');
let navLinks = nav.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 800){
      openCloseNav();
    }
  });
});

let lastScrollTop = 0;
function getScrollDirection() {
    let direction = null;
    let st = window.pageYOffset;
    let nav = document.querySelector('nav');
    if (st < lastScrollTop){
      // Scrolling up
      nav.classList.add('fixed-nav');      
    } else {
      // Scrolling down
      nav.classList.remove('fixed-nav');
    }

    lastScrollTop = st;
    // return direction;
}

let throttledFunction = throttle(getScrollDirection, 200, {'leading': false});
window.addEventListener('scroll', throttledFunction);



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

//copy email button
let copyBtn = document.querySelector('#copy-email');
copyBtn.addEventListener('click', () => {
  let emailTxt = document.querySelector('#email').textContent;
  navigator.clipboard.writeText(emailTxt);
   launch_notification();
});

let launch_notification = () =>{
  let notification = document.getElementById("toast")
          notification.className = "show";
          setTimeout(() => { notification.className = notification.className.replace("show", ""); }, 1500);
}

// Animation
document.addEventListener('DOMContentLoaded', () => {
  let bottomFadeinObserver = new IntersectionObserver(entries => 
    {
      entries.forEach((entry) => {
        entry.target.classList.toggle('fade-in-bottom', entry.isIntersecting);
        entry.target.classList.toggle('a-duration-05', entry.isIntersecting);
        // console.log(entry.isIntersecting);
        if(entry.isIntersecting === true) {
          bottomFadeinObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  1,
      rootMargin: "0px 0px -200px 0px",
    }
  );
  let heroObserver = new IntersectionObserver(entries => 
    {
      entries.forEach(entry => {
        let heroTxt = entry.target.querySelector('#hero-text');
        let heroIcons = entry.target.querySelector('#icons-board');
        
        heroTxt.classList.toggle('fade-in-bottom', entry.isIntersecting);
        heroTxt.classList.toggle('a-duration-08', entry.isIntersecting);
        heroTxt.classList.toggle('a-delay-05', entry.isIntersecting);
  
        heroIcons.classList.toggle('fade-in-bottom', entry.isIntersecting);
        heroIcons.classList.toggle('a-duration-05', entry.isIntersecting);
        heroIcons.classList.toggle('a-delay-1', entry.isIntersecting);
        if(entry.isIntersecting === true) {
          heroObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.9,
      rootMargin: '',
    } 
  );
  let contactsObserver = new IntersectionObserver(entries => 
    {
      entries.forEach((entry) => {
        let title = entry.target.querySelector('#contactme-title');
        let contact_titles = entry.target.querySelectorAll('.c-title');
        let contacts = entry.target.querySelectorAll('.contact');
        let buttons = entry.target.querySelectorAll('.copy-link-btn');

        title.classList.toggle('fade-in-fwd', entry.isIntersecting);
        title.classList.toggle('a-duration-08', entry.isIntersecting);

        contact_titles.forEach(title => {
          title.classList.toggle('swing-in-top-fwd', entry.isIntersecting);
          title.classList.toggle('a-duration-08', entry.isIntersecting);  
          title.classList.toggle('a-delay-contacts', entry.isIntersecting);  
        });

        contacts.forEach(txt => {
          txt.classList.toggle('swing-in-top-fwd', entry.isIntersecting);
          txt.classList.toggle('a-duration-08', entry.isIntersecting);    
          txt.classList.toggle('a-delay-contacts', entry.isIntersecting);    
        });

        buttons.forEach(btn => {
          btn.classList.toggle('swing-in-top-fwd', entry.isIntersecting);
          btn.classList.toggle('a-delay-contacts', entry.isIntersecting);  
        });
            // console.log(entry.isIntersecting);
        if(entry.isIntersecting === true) {
          contactsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  1,
    }
  );
  let aboutMeObserver = new IntersectionObserver(entries => 
    {
      entries.forEach((entry) => {
        let buttonsDiv = entry.target.querySelector('#aboutme-buttons');
        let textDiv = entry.target.querySelector('#aboutme-info');

        buttonsDiv.classList.toggle('fade-in-bottom', entry.isIntersecting);
        buttonsDiv.classList.toggle('a-duration-05', entry.isIntersecting);
        textDiv.classList.toggle('fade-in-bottom', entry.isIntersecting);
        textDiv.classList.toggle('a-duration-05', entry.isIntersecting);

        if(entry.isIntersecting === true) {
          aboutMeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  window.innerHeight > 650 ? 0.9 : 0.7,
    }
  );

  let projectObserver = new IntersectionObserver(entries => 
    {
      entries.forEach((entry) => {
        let title = entry.target.querySelector('#side-ptitle');
        let des = entry.target.querySelector('#side-des');
        let img = entry.target.querySelector('#side-img');
        title.classList.toggle('fade-in-bottom', entry.isIntersecting);
        title.classList.toggle('a-duration-05', entry.isIntersecting);

        des.classList.toggle('fade-in-bottom', entry.isIntersecting);
        des.classList.toggle('a-duration-05', entry.isIntersecting);
        if (entry.target.classList.contains('rtl')) {
          img.classList.toggle('rotate-in-2-ccw', entry.isIntersecting);
          img.classList.toggle('a-duration-08', entry.isIntersecting);
        }
        else {
          img.classList.toggle('rotate-in-2-cw', entry.isIntersecting);
          img.classList.toggle('a-duration-08', entry.isIntersecting);
        }
        if(entry.isIntersecting === true) {
          projectObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  window.innerHeight > 650 ? 0.9 : 0.7 ,
      // rootMargin: "0px 0px -40px 0px",
    }
  );
  let p_title = document.querySelector('#projects-title');
  let projects = document.querySelectorAll('#project');
  let aboutme = document.querySelector('#aboutme-section');
  let contacts = document.querySelector('#contactme-section');
  let hero = document.querySelector('#hero');
  heroObserver.observe(hero);
  projects.forEach(project => projectObserver.observe(project));
  bottomFadeinObserver.observe(p_title);
  aboutMeObserver.observe(aboutme);
  contactsObserver.observe(contacts);


  // right_side_imgs.forEach(img => rotateinObserver.observe(img));

});

//Hero icons grid animation
let blocks = Array.from(document.querySelectorAll('.board-block'));
// blocks.forEach(block => {
//   block.addEventListener('animationend', () => block.classList.remove('flip-block'));
// });
let unusedIcons = Array.from(document.querySelectorAll('.unused'));
let currentIcons = Array.from(document.querySelectorAll('.current'));
let previousBlock = 5;

(setInterval(flipBlock, 1000));

function flipBlock() {
  let blockIndex = 0;
  do {
    blockIndex = Math.floor(Math.random() * blocks.length);
  } while (blockIndex === previousBlock)
  previousBlock = blockIndex;
  let unusedIndex = Math.floor(Math.random() * unusedIcons.length);

  let block = blocks[blockIndex];
  let unused = unusedIcons[unusedIndex];
  let icon = block.querySelector('.current');
  icon.classList.remove('backcard');
  block.classList.remove('flip-block');
  void block.offsetWidth; //force browser to render
  
  unusedIcons.splice(unusedIndex, 1);
  currentIcons.splice(currentIcons.indexOf(icon), 1);

  unused.classList.add('backcard');
  unused.classList.remove('unused');
  unused.classList.add('current');
  block.append(unused);
  block.classList.add('flip-block')
  
  unusedIcons.push(icon);
  currentIcons.push(unused);

  setTimeout(() => {
    icon.classList.add('unused');
    block.removeChild(icon);
  }, 600);

}