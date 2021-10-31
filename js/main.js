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

/* ***************************************************
 ******************************************************
 *******************************************************/

// IMAGE SLIDER

const productImages = document.querySelectorAll(".image__wrapper img");
const thumbnailImages = document.querySelectorAll(
  ".product__image__thumbnail img"
);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// MODEL ELEMENTS

const closeModelIcon = document.querySelector(".close-model");
const model = document.querySelector(".product__samples__model");
const modelImage = document.querySelectorAll(
  ".product__samples__images__wrapper img"
);
const modelImageThumbnail = document.querySelectorAll(
  ".product__samples__thumbnail img"
);

const modelPrevBtn = document.querySelector(".model__prev");
const modelNextBtn = document.querySelector(".model__next");

let current = 0;

// HIDE ALL THE IMAGES
const resetSlide = (imageContainer) => {
  imageContainer.forEach((img) => {
    img.style.display = "none";
  });
};

// DISPLAY THE FIRST IMAGE AND HIDE THE REST
const beginSlide = () => {
  resetSlide(productImages);
  productImages[current].style.display = "block";
};

// SHOW PREVIOUS IMAGE
const slideLeft = () => {
  resetSlide(productImages);
  productImages[current - 1].style.display = "block";
  current--;
};

// SHOW NEXT IMAGE
const slideRight = () => {
  resetSlide(productImages);
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
    resetSlide(productImages);
    current = index;
    productImages[current].style.display = "block";
  });
});

/* ********************************************
 **********************************************
 ***************** MODEL ********************* */

closeModelIcon.addEventListener("click", () => {
  model.style.display = "none";
});

productImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    model.style.display = "flex";
    resetSlide(modelImage);
    modelImage[index].style.display = "block";
  });
});

modelImageThumbnail.forEach((img, index) => {
  img.addEventListener("click", () => {
    resetSlide(modelImage);
    current = index;
    modelImage[current].style.display = "block";
  });
});

modelPrevBtn.addEventListener("click", () => {
  resetSlide(modelImage);
  if (current === 0) {
    current = modelImage.length;
  }
  modelImage[current - 1].style.display = "block";
  current--;
});

modelNextBtn.addEventListener("click", () => {
  resetSlide(modelImage);
  if (current === modelImage.length - 1) {
    current = -1;
  }
  modelImage[current + 1].style.display = "block";
  current++;
});

/* ************************************************************
 *****************************************************************
 **************************************************************** */

// CART ITEMS

const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.querySelector(".cart__items");
const cartContainer = document.querySelector(".cart__item__container");

const productQuantity = document.querySelector(".quantity");
const increaseQuantity = document.querySelector(".plus-btn");
const decreaseQuantity = document.querySelector(".minus-btn");

// TOOGLE TO DISPLAY THE CART OR NOT

cartIcon.addEventListener("click", () => {
  cartItems.classList.toggle("show-cart");
});

// increase or decrease the total number of the product the user wants

function updateProductQuantity() {
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

// ADDES THE ITEM THE USER SELECTED TO THE CART

function updateCart(totalQuantity, totalCost) {
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
        <span class="total">$${totalCost}</span>
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
  cartContainer.innerHTML = cartUpdate;
  return cartUpdate;
}

function addToCart() {
  const addToCartBtn = document.querySelector(".btn__add__to__cart");
  addToCartBtn.addEventListener("click", (e) => {
    addItem();
    updateTooltip(addItem(), "visible");
  });
}

addToCart();

/* *********************************************
 ***********************************************
 UPDATE CART ICON TOOLTIP THAT DISPLAY THE TOTAL QUANTITY OF 
 ITEM THE USER HAS ADDED TO THE CART
 *******************************************
 ************************************************** */

function updateTooltip(productQuantity, visibility) {
  const productQuantityTootip = document.querySelector(
    ".product__quantity__tooltip "
  );
  productQuantityTootip.innerText = Number(productQuantity).toString();
  productQuantityTootip.style.visibility = visibility;
}

/* ******************************************************
 ***************************************************** */

function addItem() {
  const totalItemInCart = Number(productQuantity.innerHTML);
  const totalCost = updateCartTotalAmount(totalItemInCart);
  updateCart(totalItemInCart, totalCost);
  return totalItemInCart;
}

/* ************************************************************
 ****************************************************************** */

function deleteItem() {
  let productQuantityOnCart = document.querySelector(".item__name .quantity");
  let itemOnCartTotal = document.querySelector(".item__name .total");

  // GET THE PRODUCT QUANTITY ON THE PRODUCT DETAILS PAGE SO WHEN THE USER
  // REDUCES THE QUANTITY FROM THE CART IT ALSO REDUCES THE QUANTITY ON
  // THE PRODUCT DETAILS PAGE ALSO

  let productQuantityonPage = document.querySelector(
    ".product__quantity .quantity"
  );
  //

  // CONVERT THE PRODUCT QUANTITY TO NUMBER
  let productQuantityonCartNumber = convertToNumber(
    productQuantityOnCart.innerText
  );

  //
  if (productQuantityonCartNumber > 1) {
    productQuantityonCartNumber -= 1;

    //
    productQuantityOnCart.innerText = convertToString(
      productQuantityonCartNumber
    );

    productQuantityonPage.innerText = convertToString(
      productQuantityonCartNumber
    );
    itemOnCartTotal.innerText = `$${updateCartTotalAmount(
      productQuantityonCartNumber
    )}`;

    /* *******************************************************
     ***********************************************************/
    // UPDATE TOOLTIP
    updateTooltip(convertToString(productQuantityonCartNumber), "visible");

    /* **********************************************************
     ***********************************************************/
  } else if (productQuantityonCartNumber === 1) {
    cartContainer.innerHTML = `<p>Your cart is empty</p>`;
    updateTooltip(convertToString, "hidden");
  }
}

function updateCartTotalAmount(productQuantity) {
  const productPrice = 125;
  const totalAmount = productPrice * productQuantity;
  return convertToString(totalAmount);
}

function convertToNumber(string) {
  return Number(string);
}

function convertToString(number) {
  return number.toString();
}
