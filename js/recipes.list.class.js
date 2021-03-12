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

    getFilterTag(fct, type, text) {
        let ingredientTagList
        let ustensilTagList;
        let applianceTagList;
        let searchArray = [];
        let ingredientTag = document.querySelector("#ingredient__tag");
        let ustentilTag = document.querySelector("#ustensil__tag");
        let applianceTag = document.querySelector("#appliance__tag");
        switch (fct) {
            case "filter":
                switch (type) {
                    case "ingredient":
                        ingredientTagList = new Array();
                        ingredientTagList.push(text);
                        ingredientTag.innerHTML = `<div class="ingredient tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ingredient', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        searchArray.push(ingredientTagList);
                    case 'ustensil':
                        ustensilTagList = new Array();
                        ustensilTagList.push(text);
                        ustentilTag.innerHTML = `<div class="ustensil tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ustensil', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        searchArray.push(ingredientTagList);
                    case 'appliance':
                        applianceTagList = new Array();
                        applianceTagList.push(text);
                        applianceTag.innerHTML = `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        searchArray.push(ingredientTagList)
                }
                this.filterList(searchArray)
            case 'defilter':
                switch (type){
                    case "ingredient":
                        let ingredientIndex = ingredientTagList.indexOf(text);
                        searchArray[0].splice(ingredientIndex, 1);
                        this.filterList(type, ingredientTagList);
                    case 'ustensil':
                        let ustensilIndex = ustensilTagList.indexOf(text);
                        searchArray[1].splice(ustensilIndex, 1);
                        this.filterList(type, ustensilTagList);
                    case 'appliance':
                        let applianceIndex = applianceTagList.indexOf(text);
                        searchArray[2].splice(applianceIndex, 1);
                        this.filterList(type, applianceTagList);
                }
                document.getElementById(text).innerHTML="";
                this.filterList(searchArray);
        }
    }

    filterList(array) {
        let filteredlist = this.filteredList;
        document.querySelector("#card__reciper--list").innerHTML = "";
        let recipeName
        let recipeIngredients
        let recipeIngredient
        let recipeUstensils
        let recipeUstensil
        let recipeAppliance
        let recipeDescription
        for (let p = 0; p < filteredlist.length; p++){
            recipeName = filteredlist.name;
            recipeIngredients = filteredlist.ingredients;
            recipeUstensils = filteredlist.ustensils;
            recipeAppliance  = filteredlist.appliance;
            recipeDescription = filteredlist.description;
            for (let i = 0; i < array.length; i++){
                for (let j = 0; j < array[i].length; j++){
                    let tag = array[i][j];
                    let isMatch = recipeName.includes(tag) || recipeDescription.includes(tag) || recipeAppliance.includes(tag);
                    if (isMatch){
                        document.querySelector("#card__reciper--list").innerHTML = filteredlist[p].getCardHTML();
                    }

                }
            }
        }


        }


}
