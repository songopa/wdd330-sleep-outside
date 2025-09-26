import { renderListWithTemplate, fixImageUrl, addBreadcrumbItem, addProductToCart } from "./utils.mjs";


function productCardTemplate(product) {
    const imageUrl = fixImageUrl(product.Images?.PrimaryMedium || product.Image || "");
    return "<li class=\"product-card\">" +
        "<a href=\"/product_pages/index.html?product=" + product.Id + "\">" +
        "<img src=\"" + imageUrl + "\" alt=\"" + (product.Name || "") + "\">" +
        "<h2>" + (product.Brand?.Name || "") + "</h2>" +
        "<h3>" + (product.Name || "") + "</h3>" +
        "<p class=\"product-card__price\">$" + (product.FinalPrice || "") + "</p>" +
        "</a>" +
        "<button class=\"add-to-cart\" data-product-id=\"" + product.Id + "\">Add to Cart</button>" +
        "</li>";
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
        addBreadcrumbItem(this.category || "Uncategorized", `/product_listing/index.html?category=${this.category || ""}`);

        // Add event listener for "Add to Cart" buttons
        const addToCartButtons = this.listElement.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.target.dataset.productId;
                if (productId) {
                    addProductToCart(productId);
                }
            });
        });
    }

    renderList(list) {
        //refactored render list from util js
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin",true);
    }

    async sortAndRender(sortBy) {
        let sortedProducts = [...this.products];
        if (sortBy === "name") {
            sortedProducts.sort((a, b) => {
                const nameA = (a.Name || "").toLowerCase();
                const nameB = (b.Name || "").toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (sortBy === "price") {
            sortedProducts.sort((a, b) => {
                const priceA = a.FinalPrice || 0;
                const priceB = b.FinalPrice || 0;
                return priceA - priceB;
            });
        }
        this.renderList(sortedProducts);
    }
}
