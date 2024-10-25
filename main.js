import './style.css'




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
