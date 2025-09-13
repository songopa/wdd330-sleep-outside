import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

  return newItem;
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(e) {
  const idToRemove = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter(item => item.Id != idToRemove);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();
