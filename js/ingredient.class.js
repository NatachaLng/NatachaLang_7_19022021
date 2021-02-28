class Ingredient {
    /**
     *
     * @param tags
     */
    constructor(ingredient) {
        this.ingredient = ingredient;
    }

    /**
     * Get Card HTML
     * @returns {string}
     */
    getHTML() {
        return `<li class="list__items">${this.ingredient}</li>`;
    }
}