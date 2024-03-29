//const Swiper = require("swiper");
//import Swiper from 'swiper';

console.log('hi');
document.querySelector('.menu__icon').addEventListener('click', openPopup);
document.querySelector('.menu__popup-btn').addEventListener('click', closePopup);

const menuPopup = document.querySelector('.menu__popup');

function openPopup(e) {
    //console.log(e)
    if (menuPopup.classList.contains('menu__popup--active')) {
        menuPopup.classList.remove('menu__popup--active');
    } else {
        menuPopup.classList.add('menu__popup--active');
    }
    //menuPopup.classList.remove('menu__popup--active');
}

function closePopup(e) {
    menuPopup.classList.remove('menu__popup--active');
}

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    allowTouchMove: false, 
    slides: [
      document.querySelector('.swiper-slide-1'),
      document.querySelector('.swiper-slide-2'),
      document.querySelector('.swiper-slide-3'),
      document.querySelector('.swiper-slide-4'),
      document.querySelector('.swiper-slide-5'),
    ]
  });

document.querySelector('.slide-1').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.slideTo(0);
});
document.querySelector('.slide-2').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.slideTo(1);
});