import { qs, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartElement = qs(".cart-list");
const cart = new ShoppingCart(cartElement);
cart.init();
