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
    getIngredientHTML() {
        return `<li class="list__items ingredient__tag" id="${this.ingredient}" onclick="recipeList.filterList('filter', 'ingredient','${this.ingredient}')">${this.ingredient}</li>`;
    }
}