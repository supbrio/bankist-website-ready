'use strict';

const modal = document.querySelector('.modal');
const header = document.querySelector('.header')
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const allSections = document.querySelectorAll('.section')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// btnsOpenModal is a node list so it can be manipulated with foreach
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scroll
///////
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect()
  // console.log(s1coords)
  // console.log(e.target.getBoundingClientRect())
  // console.log('current scroll (X/Y)', window.pageXOffset,window.pageYOffset)
  // console.log('height/width vieWport', document.documentElement.clientHeight, document.documentElement.clientWidth)
/////
// JUST SCROLL
// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
//////
// MAKING IT SMOOTH
window.scrollTo({
    left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset,
    behavior:"smooth"
  });
 ///
  // MODERN WAY
  section1.scrollIntoView({behavior:"smooth"})
})
/////////////////
// Page navigation

// const linksNav = document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     // const coords = document.querySelector(`${id}`).getBoundingClientRect()
//     // window.scrollTo({
//     //   left: coords.left + window.pageXOffset, top: coords.top + window.pageYOffset,
//     //   behavior:"smooth"
//     // });
//     // or
//     document.querySelector(id).scrollIntoView({behavior:"smooth"})
//   })
// })

// BETTER WAY!
// 1. Add event listener to a common parent element
// 2. In that event listener determine what element originated the event
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //Matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:"smooth"})
    console.log(e.target)
  }
})

// Tabbed component



tabsContainer.addEventListener('click', function(e){
  const clicked= e.target.closest('.operations__tab');
  console.log(clicked)

  // Guard clause
  if(!clicked)return;

  // Active tab
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active')
  });
  clicked.classList.add('operations__tab--active')

  // Activate content area
  // First remove content from unactive tabs.
  tabsContent.forEach(con => {
    con.classList.remove('operations__content--active')
  });
  // Showing the content of the active tab
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  

})

//Not a good practice
// tabs.forEach(tab => {
//   tab.addEventListener('click', function(e){
//     e.preventDefault()
//     console.log('jee')
//   })
  
// });

// Menu fade animation

// using mouseover because it bubbles

const handleHover = function (e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    // there is two layers needed to go up
    const siblings = link.closest('.nav').
    querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
  
    siblings.forEach(el => {
      if (el !== link)el.style.opacity = this
    });
    logo.style.opacity = this;
    }
}
// CLearer way
nav.addEventListener('mouseover', (e) => handleHover(e, 0.5))
nav.addEventListener('mouseout', (e) => handleHover(e, 1))
// Better way!
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// STICKY NAVIGATION

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(e){
//   console.log(window.scrollY)
//   if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')

// })

// Sticky navigation: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
  const [entry] = entries; 
    if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }
    else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin : `${-nav.clientHeight}px`
  // or
  rootMargin : `${-navHeight}px`
})

headerObserver.observe(header);

// Reveal sections


const revealSection = function(entries, observer) {
  const [entry] = entries; 
  if(!entry.isIntersecting)return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(sec => {
  sectionObserver.observe(sec)
  // sec.classList.add('section--hidden')
});

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting)return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})

imgTargets.forEach(img => {
  imgObserver.observe(img)
  img.classList.add('lazy-img')
});



// Slider component

const slider = function(){

const allSlides = document.querySelectorAll('.slide')
const btnSliderLeft = document.querySelector('.slider__btn--left')
const btnSliderRight = document.querySelector('.slider__btn--right')
const slider = document.querySelector('.slider')
const dotContainer = document.querySelector('.dots')
let curSlide = 0;
const maxSlide = allSlides.length;


//functions
const createDots = function(){
  allSlides.forEach((_, i)=>{
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

const activateDot = function(sl){
  document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active')

      document.querySelector(`.dots__dot[data-slide="${sl}"]`).classList.add('dots__dot--active')
  });
}

const goToSlide = function(slide){
  allSlides.forEach((sl,i) => {
    sl.style.transform = `translate(${100 * (i-slide)}%)`
  });
}

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide)
  activateDot(curSlide)
}

// Previous Slide  
const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide -1;
  else curSlide--;
  goToSlide(curSlide)
  activateDot(curSlide)
}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0)
}
init()

//Event handlers

btnSliderRight.addEventListener('click',nextSlide)

btnSliderLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
  const {slide} = e.target.dataset
  goToSlide(slide);
  activateDot(slide)
  }
})
}
slider()