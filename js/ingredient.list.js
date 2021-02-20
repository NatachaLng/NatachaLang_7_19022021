class IngredientList {

    /**
     *
     * @param selector_id_list
     * @param db
     */

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.getIngredients();
        this.createHTML();
    }

    /**
     * Get all photographers from local database
     * @return {Array}
     */


    getIngredients() {
        let Ingredients = new Array;
        for (let p of this.db.getDatas().recipes.ingredients) {
            let ingredient = new Ingredient(
                p.ingredient,
                p.quantity,
                p.unit)
            Ingredients.push(ingredient)
        }
        return Ingredients;
    }

    /**
     * Create Cards from getPhotographers()
     */

    createHTML() {
        let ingredients = this.getIngredients();
        for (let i = 0; i < ingredients.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += ingredients[i].getHTML();
        }
    }

}