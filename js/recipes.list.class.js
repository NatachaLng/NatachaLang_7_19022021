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
        document.getElementById("nomatch__message").style.display = "none";
        if (array.length < 1) {
            document.getElementById("nomatch__message").style.display = "block"
        } else {
            for (let i = 0; i < array.length; i++) {
                document.querySelector(this.selector_id_list).innerHTML += array[i].getCardHTML();
            }
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
                        console.log(text);
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
        this.filterList(searchArray)
    }

    mainSearchBar(text) {
            this.init();
            text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let recipes = this.filteredList;
            this.filteredList = [];
            for (let recipe of recipes) {
                let recipeSearchBarIngr = true;
                let recipeSearchBarIngredient = [];
                let recipeMatchSearchBar = true;
                for (let i = 0; i < recipe.ingredients.length; i++) {
                    recipeSearchBarIngredient.push(recipe.ingredients[i].ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
                }
                let recipeIngr = (recipeSearchBarIngredient.filter(ingredient => {
                        if (ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(text)) {
                            return true
                        }
                    }))
                    if (recipeIngr.length !== 0) {
                        recipeIngr = true
                    }
                recipeSearchBarIngr = recipeSearchBarIngr && recipeIngr;
                recipeMatchSearchBar = recipeMatchSearchBar && (recipe.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(text) || recipe.description.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(text) || recipeSearchBarIngr);
                if (recipeMatchSearchBar == true) {
                    this.filteredList.push(recipe);
                    console.log(this.filteredList)
                }
        }
        this.createCards(this.filteredList);
        ingredientList.filtered(this.filteredList)
        applianceList.filtered(this.filteredList)
        ustensilList.filtered(this.filteredList)
        }


    filterList(array) {
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
            let recipeUstensil = [];
            let recipeAppliance = [];
            if (ingredients.length !== 0) {
                for (let i = 0; i < recipe.ingredients.length; i++) {
                    recipeIngredient.push(recipe.ingredients[i].ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
                }
                for (let ingr of ingredients) {
                    let recipeIngr = (recipeIngredient.filter(ingredient => {
                        if (ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(ingr).toLowerCase()) {
                            return true
                        }
                    }))
                    if (recipeIngr.length !== 0) {
                        recipeIngr = true
                    }
                    recipeMatchIngr = recipeMatchIngr && recipeIngr;
                }
            }
            if (ustensils.length !== 0) {
                for (let i = 0; i < recipe.ustensils.length; i++) {
                    recipeUstensil.push(recipe.ustensils[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
                }
                for (let ust of ustensils) {
                    let recipeUst = (recipeUstensil.filter(ustensil => {
                        if (ustensil.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(ust).toLowerCase()) {
                            return true
                        }
                    }))
                    if (recipeUst.length !== 0) {
                        recipeUst = true
                    }
                    recipeMatchUst = recipeMatchUst && recipeUst
                }
            }
            if (appliances.length !== 0) {
                for (let i = 0; i < recipe.appliance.length; i++) {
                    recipeAppliance.push(recipe.appliance.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
                }
                for (let appl of appliances) {
                    let recipeApp = (recipeAppliance.filter(appliance => {
                        if (appliance.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(appl)) {
                            return true
                        }
                    }))
                    if (recipeApp.length !== 0) {
                        recipeApp = true
                    }
                    recipeMatchAppl = recipeMatchAppl && recipeApp
                }
            }
                if (recipeMatchIngr === true && recipeMatchUst === true && recipeMatchAppl === true) {
                    result.push(recipe);
            }
            this.createCards(result);
            ingredientList.filtered(result)
            applianceList.filtered(result)
            ustensilList.filtered(result)
        }
    }

}
