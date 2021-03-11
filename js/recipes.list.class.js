class RecipesList {
    /**
     * Constuctor transform class to unique object
     * @param url
     */
    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
        this.filteredList = new Array();
    }

    /**
     * Init to load Datas and others event
     */

    init() {
        this.getRecipes();
        this.createCards(this.getRecipes());
        this.filteredList =  this.getRecipes()
        console.log(this.filteredList)
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

    createCards(array) {
        for (let i = 0; i < array.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += array[i].getCardHTML();
        }
    }

    filterList(fct, type, text) {
        document.querySelector("#card__reciper--list").innerHTML = "";
        let newList
        switch (fct){
            case "filter":
            switch (type){
                case "ingredient":
                document.querySelector("#ingredient__tag").innerHTML = `<div class="ingredient tag">${text}<button name="close tag" class="tag__btn" onclick="recipeList.filterList('ingredient', 'all')"><i class="far fa-times-circle"></i></button> </div>`
                    console.log(this.filteredList)
                        newList = this.filteredList.filter(recipe => (recipe.name.includes(text)));
                        console.log(newList)
                        this.createCards(newList)
                        this.filteredList = newList;
                        console.log(this.filteredList)
                case "ustensils":
                    document.querySelector("#ustensil__tag").innerHTML = `<div class="ustensil tag">${text}<button name="close tag" class="tag__btn" onclick="recipeList.filterList('ingredient', 'all')"><i class="far fa-times-circle"></i></button> </div>`
                    console.log(this.filteredList)
                        newList = this.filteredList.filter(recipe => (recipe.ustensils.includes(text)));
                    console.log(newList)
                    this.createCards(newList)
                    this.filteredList = newList;
                    console.log(this.filteredList)
                case "appliance":
                    document.querySelector("#appliance__tag").innerHTML = `<div class="appliance tag">${text}<button name="close tag" class="tag__btn" onclick="recipeList.filterList('ingredient', 'all')"><i class="far fa-times-circle"></i></button> </div>`
                    console.log(this.filteredList)
                        newList = this.filteredList.filter(recipe => (recipe.appliance.includes(text)));
                    console.log(newList)
                    this.createCards(newList)
                    this.filteredList = newList;
                    console.log(this.filteredList)
            }
        }
    }


}
