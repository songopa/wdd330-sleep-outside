import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || []; // fallback: array vacío

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Tu carrito está vacío</li>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">X</span>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();

