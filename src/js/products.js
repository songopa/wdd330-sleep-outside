import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, capitalizeFirstLetter } from "./utils.mjs";

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents";
}

function updateCategoryTitle(category) {
  const titleElement = document.getElementById("categoryTitle");
  if (titleElement) {
    // Capitalize first letter and replace hyphens with spaces
    const formattedCategory = capitalizeFirstLetter(category);
    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }
}

async function init() {
  loadHeaderFooter();

  const category = getCategoryFromUrl();
  updateCategoryTitle(category);

  const dataSource = new ExternalServices();
  const listElement = document.querySelector(".product-list");

  const productList = new ProductList(category, dataSource, listElement);
  await productList.init();

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", async (event) => {
      const sortBy = event.target.value;
      await productList.sortAndRender(sortBy);
    });
  }
}

init();
