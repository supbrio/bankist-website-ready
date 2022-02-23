'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
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

console.log(tabs)
console.log(tabsContainer)
console.log(tabsContent)


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




// tabs.forEach(tab => {
//   tab.addEventListener('click', function(e){
//     e.preventDefault()
//     console.log('jee')
//   })
  
// });

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////


// SELECTING, CREATING AND DELETING ELEMENTS


// console.log(document.documentElement)


// const header = document.querySelector('.header');
// // returns node list, can be used with foreach
// const allSections = document.querySelectorAll('.section')

// // allSections.forEach(s => console.log(s));

// document.getElementById('section--1')
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons)

// Foreach doesnt work since this returns HTMLcollection and not a Nodelist
// allButtons.forEach(b => console.log(b));

//Also returns a HTMLcollection
// document.getElementsByClassName('btn')


// Creating and inserting elements
// .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// header.prepend(message)
// header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// Delete elements

// const btnCookie = document.querySelector('.btn--close-cookie')

// btnCookie.addEventListener('click', function(){
  // message.remove()
// });

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'

// Reading styles

// Only works for inline styles...
// console.log(message.style.height)
// console.log(message.style.backgroundColor)

//Get styles even without giving the e.g. height manually
// console.log(getComputedStyle(message).color)

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 100 + 'px';


// CSS variables / CSS custom properties

// document.documentElement.style.setProperty('--color-primary', 'red')

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////


//ATRIBUTES
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)
// console.log(logo.className)

// logo.alt = 'Beautiful minimalist logo.'

// NON-STANDARD
// console.log(logo.designer)
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company','Bankist')

// GET ABSOLUTE VERSION
// console.log(logo.src)
// GET RELATIVE VERSION
// console.log(logo.getAttribute('src'))

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href)
// console.log(link.getAttribute('href'))

// DATA ATTRIBUTES

// console.log(logo.dataset.versionNumber)

// CLASSES
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c', 'j');
// logo.classList.contains('c', 'j');

// DONT USE! OVERWRITES ALL OTHER CLASSES
// logo.className = 'aatu';

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////


//SMOOTH SCROLLING

// const btnScrollTo = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')

// btnScrollTo.addEventListener('click', function(e){
//   const s1coords = section1.getBoundingClientRect()
//   console.log(s1coords)
//   console.log(e.target.getBoundingClientRect())
//   console.log('current scroll (X/Y)', window.pageXOffset,window.pageYOffset)
//   console.log('height/width vieWport', document.documentElement.clientHeight, document.documentElement.clientWidth)

// Scrolling
// /////
// JUST SCROLL
// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
// //////
// MAKING IT SMOOTH
// window.scrollTo({
//     left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset,
//     behavior:"smooth"
//   });
//  ///
//   MODERN WAY
//   section1.scrollIntoView({behavior:"smooth"})
// })

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
// EVENTS AND EVENT HANDLERS

// const h1 = document.querySelector('h1');

// THIS IS USED: SUPPORTS MULTIPLE EVENTS
// const alertH1 =  function(e){
  // alert('addEventListener: Great! You are reading the heading!');


  // h1.removeEventListener('mouseenter', alertH1)
// }
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(()=> h1.removeEventListener('mouseenter', alertH1), 3000);

// OLDSCHOOL OLD TIMES: DOESNT SUPPORT MULTIPLE EVENTS
// h1.onmouseenter = function(e){
//   alert('onmouseenter: Great! You are reading the heading!')
// }


///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
// EVENT PROPAGATION IN PRACTICE

//rgb(255,255,255)
// const randomInt = (min, max)=> Math.floor(Math.random()*(max-min+1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// console.log(randomColor())

// document.querySelector('.nav__link').addEventListener('click', function(e){
  // this.style.backgroundColor = randomColor();
  // console.log('LINK', e.target);
  // console.log(e.currentTarget === this);
  // Stop propagation
  // e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e){
  // this.style.backgroundColor = randomColor()
  // console.log('CONTAINER', e.target)
// })
// document.querySelector('.nav').addEventListener('click', function(e){
  // this.style.backgroundColor = randomColor()
  // console.log('NAV', e.target)
// })


// const h1 = document.querySelector('h1');


// // Going downwards:child
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color='white';
// h1.lastElementChild.style.color='orangered';

// // Going upwards: parents

// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// h1.closest('h1').style.background = 'var(--gradient-primary)'

// // Going sideways: siblings

// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(el => {
//     if(el !== h1)
//     el.style.transform= 'scale(0.5'
// });