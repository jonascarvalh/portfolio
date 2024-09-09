var swiper = new Swiper('.swiper', {
slidesPerView: 1,
spaceBetween: 10,
autoplay: {
    delay: 2500,
    disableOnInteraction: false
},
pagination: {
    el: '.swiper-pagination',
    clickable: true,
},
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
loop: true, // Faz o swiper ser cíclico
});

swiper.el.addEventListener('mouseover', function() {
    swiper.autoplay.stop();
});
  
swiper.el.addEventListener('mouseout', function() {
    swiper.autoplay.start();
});