class RecipesList {
    /**
     * Constuctor transform class to unique object
     * @param url
     */
    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
        this.filteredList = new Array();
        this.ingredientTagList = new Array()
        this.ustensilTagList = new Array();
        this.applianceTagList = new Array();
    }

    /**
     * Init to load Datas and others event
     */

    init() {
        this.getRecipes();
        this.createCards(this.getRecipes());
        this.filteredList =  this.getRecipes()
        console.log(this.filteredList);

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

    getFilterTag(fct, type, text) {
        let searchArray = new Array();
        let ingredientTag = document.querySelector("#ingredient__tag");
        let ustensilTag = document.querySelector("#ustensil__tag");
        let applianceTag = document.querySelector("#appliance__tag");
        switch (fct) {
            case "filter":
                switch (type) {
                    case "ingredient":
                        this.ingredientTagList.push(text);
                        ingredientTag.innerHTML = `<div class="ingredient tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ingredient', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break
                    case 'ustensil':
                        this.ustensilTagList.push(text);
                        ustensilTag.innerHTML = `<div class="ustensil tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ustensil', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break
                    case 'appliance':
                        this.applianceTagList.push(text);
                        applianceTag.innerHTML = `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                }
                break
            case 'defilter':
                switch (type){
                    case "ingredient":
                        let ingredientIndex = this.ingredientTagList.indexOf(text);
                        this.ingredientTagList.splice(ingredientIndex, 1);
                        break
                    case 'ustensil':
                        let ustensilIndex = this.ustensilTagList.indexOf(text);
                        this.ustensilTagList.splice(ustensilIndex, 1);
                        break
                    case 'appliance':
                        let applianceIndex = this.applianceTagList.indexOf(text);
                        this.applianceTagList.splice(applianceIndex, 1);
                }
                document.getElementById(text).display = "none"
        }
        searchArray.push(this.ingredientTagList);
        searchArray.push(this.ustensilTagList);
        searchArray.push(this.applianceTagList);
        this.filterList(searchArray);
    }

    filterList(array){
        console.log(array)
        let result = [];
        let recipes = this.filteredList;
        let ingredients = array[0];
        let ustensils = array[1];
        let appliances = array[2];
        for (let recipe of recipes) {
            let recipeMatchIngr = true
            let recipeMatchUst = true
            let recipeMatchAppl = true
            let recipeIngredient = [];
            if (ingredients.length !== 0) {
                for (let i = 0; i < recipe.ingredients.length; i++){
                    recipeIngredient.push(recipe.ingredients[i].ingredient)
                }
                for (let ingr of ingredients) {
                        console.log(recipeIngredient);
                        console.log(ingr)
                        recipeMatchIngr = recipeMatchIngr && (recipeIngredient.indexOf(ingr) !== -1)
                        console.log(recipe.ingredients, recipeMatchIngr)
                    }
            }
            if (ustensils.length !== 0) {
                for (let ust of ustensils) {
                    recipeMatchUst = recipeMatchUst && (recipe["ustensils"].indexOf(ust) !== -1)
                }
            }
            if (appliances.length !== 0) {
                for (let appl of appliances) {
                    recipeMatchAppl = recipeMatchAppl && (recipe["appliance"].indexOf(appl) !== -1)
                }
            }
            if (recipeMatchIngr === true && recipeMatchUst === true && recipeMatchAppl === true){
                result.push(recipe);
            }
        }
            console.log(result)

            }

}
