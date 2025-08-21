// Swiper init
new Swiper('.hero', {
  pagination: { el: '.swiper-pagination', clickable: true }
});

new Swiper('.collection', {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    1280: { slidesPerView: 4 },
    768: { slidesPerView: 2.5 },
    0: { slidesPerView: 1.1 }
  }
});

// Form simulation
document.getElementById('helpForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you!');
  e.target.reset();
});

// Spotlight logic
const mainImage = document.getElementById('mainImage');
const price = document.getElementById('price');
document.querySelectorAll('.spotlight__thumbs img, .colors button').forEach(el => {
  el.addEventListener('click', () => {
    mainImage.src = `assets/images/${el.dataset.main || el.dataset.img}`;
    price.textContent = `$${el.dataset.price}`;
  });
});

// Popup logic
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!localStorage.getItem('popupClosed')) {
      document.getElementById('popup').classList.add('show');
    }
  }, 1000);
});

document.querySelector('#popup .close').addEventListener('click', () => {
  document.getElementById('popup').classList.remove('show');
  localStorage.setItem('popupClosed', true);
});

document.getElementById('popupForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you!');
  document.getElementById('popup').classList.remove('show');
  localStorage.setItem('popupClosed', true);
});
