
const swiper = new Swiper('.slider', {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  parallax:true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  navigation: {
    prevEl: '.slider-position-prev',
    nextEl: '.slider-position-next',
  },

  breakpoints: {
      0: {
        slidesPerView: 1,
      },
    },
});


