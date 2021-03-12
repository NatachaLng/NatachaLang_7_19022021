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
                        this.ustensilTagList.push("");
                        this.applianceTagList.push("");
                        break
                    case 'ustensil':
                        this.ustensilTagList.push(text);
                        ustensilTag.innerHTML = `<div class="ustensil tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'ustensil', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        this.ingredientTagList.push("");
                        this.applianceTagList.push("");
                        break
                    case 'appliance':
                        this.applianceTagList.push(text);
                        applianceTag.innerHTML = `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="recipeList.getFilterTag('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        this.ingredientTagList.push("");
                        this.applianceTagList.push("");
                }
                break
            case 'defilter':
                switch (type){
                    case "ingredient":
                        let ingredientIndex = this.ingredientTagList.indexOf(text);
                        this.ingredientTagList.splice(ingredientIndex, 1);
                        this.ingredientTagList.push("");
                        break
                    case 'ustensil':
                        let ustensilIndex = this.ustensilTagList.indexOf(text);
                        this.ustensilTagList.splice(ustensilIndex, 1);
                        this.ustensilTagList.push("");
                        break
                    case 'appliance':
                        let applianceIndex = this.applianceTagList.indexOf(text);
                        this.applianceTagList.splice(applianceIndex, 1);
                        this.applianceTagList.push("");
                }
                document.getElementById(text).display = "none"
        }
        searchArray.push(this.ingredientTagList);
        console.log(this.ingredientTagList)
        searchArray.push(this.ustensilTagList);
        console.log(this.ustensilTagList)
        searchArray.push(this.applianceTagList);
        console.log(this.applianceTagList)
        this.filterList(searchArray);
    }

    filterList(array) {
        console.log(array);
        let filteredlist = this.filteredList;
        console.log(filteredlist);
        document.querySelector("#card__reciper--list").innerHTML = "";
        let recipeName
        let recipeIngredients
        let recipeIngredient
        let recipeUstensils
        let recipeUstensil
        let recipeAppliance
        let recipeDescription
        let isMatch
        let newList = [];
        for (let p = 0; p < filteredlist.length; p++) {
            recipeName = filteredlist[p].name;
            recipeIngredients = filteredlist[p].ingredients;
            for (let g = 0; g < recipeIngredients.length; g++) {
                recipeIngredient = recipeIngredients[g].ingredient
                recipeUstensils = filteredlist[p].ustensils;
                for (let u = 0; u < recipeUstensils.length; u++) {
                    recipeUstensil = recipeUstensils[u]
                    recipeAppliance = filteredlist[p].appliance;
                    recipeDescription = filteredlist[p].description;
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < array[i].length; j++) {
                            let ingredient = array[0][j];
                            let ustensil = array[1][j];
                            let appliance = array[2][j]
                            isMatch = ((recipeName.indexOf(ingredient) != -1) && (recipeName.indexOf(ustensil) != -1) && (recipeName.indexOf(appliance) != -1)) || ((recipeDescription.indexOf(ingredient) != -1) && (recipeDescription.indexOf(ustensil) != -1)) && (recipeDescription.indexOf(appliance) != -1) || ((recipeAppliance.indexOf(ingredient) != -1) && (recipeAppliance.indexOf(ustensil) != -1) && (recipeAppliance.indexOf(appliance) != -1)) || ((recipeUstensil.indexOf(ingredient) != -1) && (recipeUstensil.indexOf(ustensil) != -1) && (recipeUstensil.indexOf(appliance) != -1)) || ((recipeIngredient.indexOf(ingredient) != -1) && (recipeIngredient.indexOf(ustensil) != -1) && (recipeIngredient.indexOf(appliance) != -1));
                            if (isMatch) {
                                newList.push(filteredlist[p]);
                        }
                        }
                    }
                }
            }
        }
        let finalList = Array.from(new Set(newList))
        console.log(finalList)
        for (let i=0; i < finalList.length; i++){
            document.querySelector("#card__reciper--list").innerHTML += finalList[i].getCardHTML();
        }
    }


}
