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
        this.searchBarTagList = new Array();
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
        document.querySelector(this.selector_id_list).innerHTML = "";
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
                        this.ingredientTagList.push(text.toLowerCase());
                        ingredientTag.innerHTML += `<div class="ingredient tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ingredient', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break
                    case 'ustensil':
                        this.ustensilTagList.push(text.toLowerCase());
                        ustensilTag.innerHTML += `<div class="ustensil tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ustensil', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break
                    case 'appliance':
                        this.applianceTagList.push(text.toLowerCase());
                        applianceTag.innerHTML += `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break
                    case 'searchbar':
                        this.searchBarTagList.push(text.toLowerCase());
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
                document.getElementById(text).classList.add("hiden");
                document.getElementById(text).removeAttribute("id");
        }
        searchArray.push(this.ingredientTagList);
        searchArray.push(this.ustensilTagList);
        searchArray.push(this.applianceTagList);
        searchArray.push(this.searchBarTagList)
        this.filterList(searchArray);
    }

    filterList(array){
        let result = [];
        let recipes = this.filteredList;
        let ingredients = array[0];
        let ustensils = array[1];
        let appliances = array[2];
        let searchBar = array[3];
        for (let recipe of recipes) {
            let recipeMatchIngr = true
            let recipeMatchUst = true
            let recipeMatchAppl = true
            let recipeMatchSearchBar = true;
            let recipeIngredient = [];
            let recipeUstensil = [];
            let recipeAppliance = [];
            let recipeName = [];
            let recipeDesc = [];
            if (ingredients.length !== 0) {
                for (let i = 0; i < recipe.ingredients.length; i++){
                    recipeIngredient.push(recipe.ingredients[i].ingredient.toLowerCase())
                }
                for (let ingr of ingredients) {
                        console.log(recipeIngredient);
                        console.log(ingr)
                        recipeMatchIngr = recipeMatchIngr && (recipeIngredient.indexOf(ingr) !== -1)
                        console.log(recipe.ingredients, recipeMatchIngr)
                    }
            }
            if (ustensils.length !== 0) {
                for (let i = 0; i < recipe.ustensils.length; i++){
                    recipeUstensil.push(recipe.ustensils[i].toLowerCase())
                }
                for (let ust of ustensils) {
                    recipeMatchUst = recipeMatchUst && (recipeUstensil.indexOf(ust) !== -1)
                }
            }
            if (appliances.length !== 0) {
                for (let i = 0; i < recipe.appliance.length; i++){
                    recipeAppliance.push(recipe.appliance.toLowerCase())
                }
                for (let appl of appliances) {
                    recipeMatchAppl = recipeMatchAppl && (recipeAppliance.indexOf(appl) !== -1)
                }
            }
            if (searchBar.length !== 0){
                for (let i = 0; i < recipe.ingredients.length; i++){
                    recipeIngredient.push(recipe.ingredients[i].ingredient.toLowerCase())
                }
                for (let i = 0; i < recipe.ustensils.length; i++){
                    recipeUstensil.push(recipe.ustensils[i].toLowerCase())
                }
                for (let i = 0; i < recipe.appliance.length; i++){
                    recipeAppliance.push(recipe.appliance.toLowerCase())
                }
                for (let i = 0; i < recipe.name.length; i++){
                    recipeName.push(recipe.name[i].toLowerCase())
                }
                for (let i = 0; i < recipe.description.length; i++){
                    recipeDesc.push(recipe.description[i].toLowerCase())
                }
                for (let searchbar of searchBar) {
                    recipeMatchSearchBar = recipeMatchSearchBar && ((recipeAppliance.indexOf(searchbar) !== -1) || (recipeUstensil.indexOf(searchbar) !== -1) || (recipeIngredient.indexOf(searchbar) !== -1) || (recipeName.indexOf(searchbar) !== -1) || (recipeDesc.indexOf(searchbar) !== -1));
                }
            }
            if (recipeMatchIngr === true && recipeMatchUst === true && recipeMatchAppl === true && recipeMatchSearchBar === true){
                result.push(recipe);
                }
             }
        console.log(result)
        this.createCards(result);
        ingredientList.filtered(result);
        applianceList.filtered(result);
        ustensilList.filtered(result);
    }

}
