function swiper () {
  new Swiper('.hero', {
    pagination: {el: '.swiper-pagination', clickable: true},
    autoplay: {
      delay: 5000,
    },
    loop: true
  });

  new Swiper('.collection', {
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1280: {slidesPerView: 4},
      768: {slidesPerView: 2.5},
      0: {slidesPerView: 1.1}
    },
  });
}
function burgerMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenuWrapper = document.querySelector('.nav__menu-wrapper');

  burgerMenu.addEventListener('click', () => {
    const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
    burgerMenu.classList.toggle('open');
    navMenuWrapper.classList.toggle('menu-active');
    burgerMenu.setAttribute('aria-expanded', !isExpanded);
  });
}
// Form simulation
function helpFormimulation() {
  const form = document.getElementById('helpForm');
  if (!form) return;

  form.addEventListener('submit', onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  alert('Thank you!');
  event.target.reset();
}

function spotlight() {
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

// color switch
  document.querySelectorAll(".color").forEach(btn => {
    btn.addEventListener("click", () => {
      // оновлюємо активний колір
      document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");

      const color = btn.dataset.color;
      const price = btn.dataset.price;
      priceEl.textContent = `$${price}`;
      renderThumbnails(productData[color]);
      mainImage.src = productData[color][0];
    });
  });

// ========== Генерація мініатюр ==========
  function renderThumbnails(images) {
    thumbs.innerHTML = "";
    images.forEach((src, idx) => {
      const thumbWrapper = document.createElement("div");
      thumbWrapper.classList.add("thumb-wrapper");

      if (idx === 0) {
        thumbWrapper.classList.add("active");
        mainImage.src = src; // Set main image on initial render for the first color
      }

      const img = document.createElement("img");
      img.src = src;
      img.alt = "Preview";

      thumbWrapper.appendChild(img);
      thumbs.appendChild(thumbWrapper);

      thumbWrapper.addEventListener("click", () => {
        document.querySelectorAll("#thumbs .thumb-wrapper").forEach(t => t.classList.remove("active"));
        thumbWrapper.classList.add("active");
        mainImage.src = src;
      });
    });
  }

  document.querySelectorAll(".swatch-option-size").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".swatch-option-size").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  renderThumbnails(productData.black);
}

function footerMenu() {
  const footerButtons = document.querySelectorAll('.footer-nav-title');
  footerButtons.forEach(button => {
    button.addEventListener('click', () => {
      const menuId = button.getAttribute('aria-controls');
      const menuList = document.getElementById(menuId);

      menuList.classList.toggle('is-active');
      const isExpanded = button.getAttribute('aria-expanded') === 'true' || false;
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

function popupBanner() {
  const modal = document.getElementById("popup-banner");
  const closeBtn = modal.querySelector(".popup-banner-btn-close");
  const form = modal.querySelector(".popup-banner-form");
  const emailInput = document.getElementById("popup-banner-email");

  const STORAGE_KEY = "popup-banner"; // унікальний ключ

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    // Focus
    setTimeout(() => emailInput?.focus(), 50);
    document.body.setAttribute("data-modal-open", "true");
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    localStorage.setItem(STORAGE_KEY, "true"); // don't show anymore
    document.body.removeAttribute("data-modal-open");
  };

  // Show in 1 second if not closed yet
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTimeout(openModal, 1000);
  }

  // close btn
  closeBtn?.addEventListener("click", closeModal);

  // Closing after valid submit
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    // Проста валідація
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      emailInput.focus();
      emailInput.setCustomValidity("Please enter a valid email");
      emailInput.reportValidity();
      emailInput.addEventListener("input", () => emailInput.setCustomValidity(""), {once: true});
      return;
    }
    alert("Thank you! Discount code sent to email ✅");
    closeModal();
    form.reset();
  });

  // Additionally: close with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
}

function init () {
  swiper();
  burgerMenu();
  helpFormimulation();
  popupBanner();
  footerMenu();
  spotlight();
}

window.addEventListener('DOMContentLoaded', init);