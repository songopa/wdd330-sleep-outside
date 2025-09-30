import ExternalServices from "./ExternalServices.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  //check if key exists before setting

  localStorage.setItem(key, JSON.stringify(data));

}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);

  updateCartCount(); // Update cart count after loading header/footer
}

export function updateCartCount() {
  const cartCount = getLocalStorage("so-cart")?.length || 0;
  const cartCountElement = qs(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

export function fixImageUrl(url) {
  // const originURL = window.location.origin;
  const baseURL = import.meta.env.VITE_SERVER_URL;
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) {
    return url;
  }
  return baseURL + url;
}

export function addBreadcrumbItem(name, href) {
  const breadcrumb = qs(".breadcrumb");
  if (!breadcrumb) return;

  const a = document.createElement("a");
  a.href = href;
  a.textContent = capitalizeFirstLetter(name);
  a.className = "breadcrumb-item";

  breadcrumb.appendChild(a);
}

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function addProductToCart(productId) {

  const cartItems = getLocalStorage("so-cart") || [];
  //inspect the cart if product is in cart
  const itemInCart = cartItems.find(item => item.Id === productId)
  if (itemInCart) {
    // increment quantity if item in cart
    itemInCart.Quantity += 1;

  } else {
    // get the product from the data source
    const dataSource = new ExternalServices()
    const product = await dataSource.findProductById(productId);
    // adding 'Quantity' key to product object before pushing it to cart.
    // this helps when adjusting quantities in the cart.
    product["Quantity"] = 1;
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
  // update the cart count in the header
  updateCartCount();
}
