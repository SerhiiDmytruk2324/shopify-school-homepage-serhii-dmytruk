// Swiper init
new Swiper('.hero', {
  pagination: { el: '.swiper-pagination', clickable: true},
  autoplay: {
    delay: 5000,
  },
  loop: true
});

new Swiper('.collection', {
  loop: true,
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
// Дані: для кожного кольору є 5 фото
const productData = {
  black: [
    "assets/images/color1/image1.jpg",
    "assets/images/color1/image2.jpg",
    "assets/images/color1/image3.jpg",
    "assets/images/color1/image4.jpg",
    "assets/images/color1/image5.jpg",
  ],
  white: [
    "assets/images/color2/image6.jpg",
    "assets/images/color2/image7.jpg",
    "assets/images/color2/image8.jpg",
    "assets/images/color2/image9.jpg",
    "assets/images/color2/image10.jpg",
  ],
  red: [
    "assets/images/color3/image11.jpg",
    "assets/images/color3/image12.jpg",
    "assets/images/color3/image13.jpg",
    "assets/images/color3/image14.jpg",
    "assets/images/color3/image15.jpg",
  ]
};

const thumbs = document.getElementById("thumbs");
const mainImage = document.getElementById("mainImage");
const priceEl = document.getElementById("price");

// ========== Перемикання кольору ==========
document.querySelectorAll(".color").forEach(btn => {
  btn.addEventListener("click", () => {
    // оновлюємо активний колір
    document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");

    const color = btn.dataset.color;
    const price = btn.dataset.price;

    // оновлюємо ціну
    priceEl.textContent = `$${price}`;

    // показуємо нові мініатюри
    renderThumbnails(productData[color]);

    // міняємо головне фото на перше
    mainImage.src = productData[color][0];
  });
});

// ========== Генерація мініатюр ==========
function renderThumbnails(images) {
  thumbs.innerHTML = "";
  images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Preview";
    if (idx === 0) img.classList.add("active");
    img.addEventListener("click", () => {
      document.querySelectorAll("#thumbs img").forEach(t => t.classList.remove("active"));
      img.classList.add("active");
      mainImage.src = src;
    });
    thumbs.appendChild(img);
  });
}

// Початковий рендер
renderThumbnails(productData.black);


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
