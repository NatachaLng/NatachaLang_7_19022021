class Ustensil {
    /**
     *
     * @param tags
     */
    constructor(ustensil) {
        this.ustensil = ustensil;
    }

    /**
     * Get Card HTML
     * @returns {string}
     */
    getUstensilHTML() {
        return `<li class="list__items ustensil" id="${this.ustensil}" onclick="recipeList('filter', 'ustensils', '${this.ustensil}'">${this.ustensil}</li>`;
    }
}