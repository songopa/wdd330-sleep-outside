import { renderListWithTemplate, fixImageUrl } from "./utils.mjs";

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
        this.products = await this.dataSource.getData();
        this.renderList(this.products);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);

    }

}

