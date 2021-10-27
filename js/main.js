// NAV MENU
const hamburger = document.querySelector(".hamburger-open");
const hamburgerCloseIcon = document.querySelector(".hamburger-close");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.remove("show-nav");
  hamburgerCloseIcon.classList.add("show-nav");
  nav.classList.add("show-nav");
  document.documentElement.style.overflow = "hidden";
});

hamburgerCloseIcon.addEventListener("click", () => {
  hamburgerCloseIcon.classList.remove("show-nav");
  hamburger.classList.add("show-nav");
  nav.classList.remove("show-nav");
  document.documentElement.style.overflowY = "scroll";
});

// IMAGE SLIDER

const productImages = document.querySelectorAll(".image__wrapper img");
const thumbnailImages = document.querySelectorAll(
  ".product__image__thumbnail img"
);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let current = 0;

// HIDE ALL THE IMAGES
const resetSlide = () => {
  productImages.forEach((img) => {
    img.style.display = "none";
  });
};

// DISPLAY THE FIRST IMAGE AND HIDE THE REST
const beginSlide = () => {
  resetSlide();
  productImages[current].style.display = "block";
};

// SHOW PREVIOUS IMAGE
const slideLeft = () => {
  resetSlide();
  productImages[current - 1].style.display = "block";
  current--;
};

// SHOW NEXT IMAGE
const slideRight = () => {
  resetSlide();
  productImages[current + 1].style.display = "block";
  current++;
};

prevBtn.addEventListener("click", () => {
  if (current === 0) {
    current = productImages.length;
  }
  slideLeft();
});

nextBtn.addEventListener("click", () => {
  if (current === productImages.length - 1) {
    current = -1;
  }
  slideRight();

  beginSlide();
});
