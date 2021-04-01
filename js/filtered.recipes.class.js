class Tag {
    isEligible(plat) {
        throw "Not implemented"
    }
}


class IngredientTag extends Tag {

    constructor(name) {
        super();
        this.name = name;
    }

    isEligible(recipe) {
        let recipeIngredientList = [];
        let eligible = false
        let ingredientList = recipe.ingredients
        ingredientList.forEach(list => {
            recipeIngredientList.push(list)
        });
        for (let i = 0; i < recipeIngredientList.length; i++) {
            let ingredients = recipeIngredientList[i];
            if (ingredients.ingredient.indexOf(this.name) !== -1) {
                eligible = true
            }
        }
        return eligible
    }

}

class UstensilTag extends Tag {

    constructor(name) {
        super();
        this.name = name;
    }

    isEligible(recipe) {
        let recipeUstensilList = [];
        let eligible = false
        let ustensilList = recipe.ustensils
        ustensilList.forEach(list => {
            recipeUstensilList.push(list)
        });
        for (let i = 0; i < recipeUstensilList.length; i++) {
            if (recipeUstensilList[i].indexOf(this.name) !== -1) {
                eligible = true
            }
        }
        return eligible
    }

}

class ApplianceTag extends Tag {

    constructor(name) {
        super();
        this.name = name;
    }

    isEligible(recipe) {
        let eligible = false;
        if (recipe.appliance.indexOf(this.name) !== -1) {
            eligible = true
        }
        return eligible
    }

}

class SearchBarTag extends Tag {
    constructor(name) {
        super();
        this.name = name
    }

    isEligible(recipe) {
        let eligible = false;
        let ingredientEligible = false;
        let nameEligible = false;
        let descriptionEligible = false;
        let recipeIngredientList = [];
        let ingredients = recipe.ingredients
        ingredients.forEach(list => {
            recipeIngredientList.push(list)
        });
        for (let i = 0; i < recipeIngredientList.length; i++) {
            let ingredients = recipeIngredientList[i];
            if (ingredients.ingredient.indexOf(this.name) !== -1) {
                ingredientEligible = true
            }
        }
        if (recipe.name.indexOf(this.name) !== -1) {
            nameEligible = true
        }
        if (recipe.description.indexOf(this.name) !== -1) {
            descriptionEligible = true
        }
        eligible = ingredientEligible || nameEligible || descriptionEligible
        return eligible
    }
}

class Filter {

    constructor() {
        this.recipesFiltered = recipeList.getRecipes();
        this.taglist = [];
        this.finalRecipeList = [];
    }

    createTagList(fct, type, text) {
        let ingredientTag = document.querySelector("#ingredient__tag");
        let ustensilTag = document.querySelector("#ustensil__tag");
        let applianceTag = document.querySelector("#appliance__tag");
        switch (fct) {
            case "filter":
                switch (type) {
                    case "ingredient":
                        this.taglist.push(new IngredientTag(text));
                        ingredientTag.innerHTML += `<div class="ingredient tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="filteredRecipeList.createTagList('defilter', 'ingredient', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break;
                    case "ustensil":
                        this.taglist.push(new UstensilTag(text));
                        ustensilTag.innerHTML += `<div class="ustensil tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="filteredRecipeList.createTagList('defilter', 'ustensil', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break;
                    case "appliance":
                        this.taglist.push(new ApplianceTag(text));
                        applianceTag.innerHTML += `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="filteredRecipeList.createTagList('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break;
                    case "searchBar":
                        this.taglist = [];
                        console.log(this.taglist);
                        this.taglist.push(new SearchBarTag(text));
                        console.log(this.taglist)
                        break;
                    default:
                        throw "error";
                }
                break;
            case 'defilter':
                        for (let obj of this.taglist){
                            let name = obj.name
                              if (name.indexOf(text) !== -1){
                                  obj.name = "";
                              }
                        }
                document.getElementById(text).classList.add("hiden");
                document.getElementById(text).removeAttribute("id");
        }
        this.filterRecipes();
    }

    filterRecipes() {
        this.finalRecipeList = [];
        if (this.taglist.length === 0) {
            this.finalRecipeList = this.recipesFiltered
        }
        for (let recipe of this.recipesFiltered) {
            let eligible = true;
            for (let tag of this.taglist) {
                eligible = tag.isEligible(recipe) && eligible;
            }
            if (eligible) {
                this.finalRecipeList.push(recipe)
            }
        }
        let cleanFinalList = Array.from(new Set(this.finalRecipeList))
        ingredientList.filtered(cleanFinalList);
        applianceList.filtered(cleanFinalList);
        ustensilList.filtered(cleanFinalList);
        recipeList.createCards(cleanFinalList);

    }

}
