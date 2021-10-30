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

// Cart

const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.querySelector(".cart__items");

cartIcon.addEventListener("click", () => {
  cartItems.classList.toggle("show-cart");
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

thumbnailImages.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    resetSlide();
    current = index;
    productImages[current].style.display = "block";
  });
});

// increase or decrease the total pieces of the product the user wants

function updateProductQuantity() {
  const productQuantity = document.querySelector(".quantity");
  const increaseQuantity = document.querySelector(".plus-btn");
  const decreaseQuantity = document.querySelector(".minus-btn");

  increaseQuantity.addEventListener("click", () => {
    productQuantity.innerHTML = `${Number(productQuantity.innerHTML) + 1}`;
  });
  decreaseQuantity.addEventListener("click", () => {
    if (productQuantity.innerHTML !== "1") {
      productQuantity.innerHTML = `${Number(productQuantity.innerHTML) - 1}`;
    }
  });
}

updateProductQuantity();

function updateCart(totalQuantity, total) {
  const cartUpdate = `

 <div class="cart__item__details">
    <div class="item__details">
      <img
        class="item__img"
        src="/images/image-product-1-thumbnail.jpg"
        alt=""
      />
      <div class="item__name">
        <p>Autumn Limited Edition..</p>
        <span>$125.00</span>
        <span>&times;</span>
        <span class="quantity">${totalQuantity}</span>
        <span>$${total}</span>
      </div>
      <div class="delete-icon">
        <img onClick="deleteItem()" src="/images/icon-delete.svg" alt="" />
      </div>
    </div>
</div>
<div class="checkout-btn">
  <button>Checkout</button>
</div>
  `;

  return cartUpdate;
}

const cartContainer = document.querySelector(".cart__item__container");

function addToCart() {
  const addToCartBtn = document.querySelector(".btn__add__to__cart");
  addToCartBtn.addEventListener("click", (e) => {
    const getProductQuantity = document.querySelector(".quantity").innerHTML;
    const totalCost = (Number(getProductQuantity) * 125).toString();
    cartContainer.innerHTML = updateCart(getProductQuantity, totalCost);
  });
}

addToCart();

function deleteItem() {
  //
  let productQuantityOnCart = document.querySelector(".item__name .quantity");
  let productQuantityonPage = document.querySelector(
    ".product__quantity .quantity"
  );
  //
  let convertToNumber = Number(productQuantityOnCart.innerText);
  let convertToString;
  //
  if (convertToNumber > 1) {
    convertToNumber -= 1;
    convertToString = convertToNumber.toString();
    //
    productQuantityOnCart.innerText = convertToString;
    productQuantityonPage.innerText = convertToString;
    //
  } else if (convertToNumber === 1) {
    cartContainer.innerHTML = `<p>Your cart is empty</p>`;
  }
}
