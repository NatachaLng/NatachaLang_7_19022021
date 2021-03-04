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
        return `<li class="list__items ingredient__tag" id="${this.ingredient}" onclick="ingredientList.filterRecipes('${this.ingredient}')">${this.ingredient}</li>`;
    }
}