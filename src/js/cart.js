import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-btn" data-id="${item.Id}" aria-label="Remove ${item.Name}">❌</button>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idToRemove = this.getAttribute("data-id");
      removeItemFromCart(idToRemove);
    });
  });
}

function removeItemFromCart(id) {
  let cart = getLocalStorage("so-cart") || [];

  cart = cart.filter((item) => item.Id !== id);

  localStorage.setItem("so-cart", JSON.stringify(cart));

  renderCartContents();
}
