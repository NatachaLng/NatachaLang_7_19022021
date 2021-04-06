class RecipesList {
    /**
     * Constuctor transform class to unique object
     * @param url
     */
    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
    }

    /**
     * Init to load Datas and others event
     */

    init() {
        this.getRecipes();
        this.createCards(this.getRecipes());
    }

    /**
     * Get all photographers from local database
     * @return {Array}
     */


    getRecipes() {
        let recipes = new Array;
        for (let p of this.db.getDatas().recipes) {
            let allRecipes = new Recipes(
                p.id,
                p.name,
                p.servings,
                p.ingredients,
                p.time,
                p.description,
                p.appliance,
                p.ustensils)
            recipes.push(allRecipes);
        }
        return recipes;
    }



    /**
     * Create Cards from getPhotographers()
     */

    createCards(recipes) {
        document.querySelector(this.selector_id_list).innerHTML = "";
        document.getElementById("nomatch__message").style.display = "none";
        if (recipes.length < 1){
            document.getElementById("nomatch__message").style.display = "block";
        } else {
            for (let i = 0; i < recipes.length; i++) {
                document.querySelector(this.selector_id_list).innerHTML += recipes[i].getCardHTML();
            }
        }
    }
}
