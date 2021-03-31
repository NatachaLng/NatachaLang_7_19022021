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
        for (let i = 0; i < recipeIngredientList.length ; i++){
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
        for (let i = 0; i < recipeUstensilList.length; i++){
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
            if (recipe.appliance.indexOf(this.name) !==-1) {
                eligible = true
            }
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
                        this.taglist.push(new ApplianceTag(text))
                        applianceTag.innerHTML += `<div class="appliance tag" id="${text}">${text}<button name="close tag" class="tag__btn" onclick="filteredRecipeList.createTagList('defilter', 'appliance', '${text}')"><i class="far fa-times-circle"></i></button> </div>`
                        break;
                    default:
                        throw "error";
                }
                break;
            case 'defilter':
                switch (type) {
                    case "ingredient":
                        let ingredientIndex = this.taglist.indexOf(text);
                        this.taglist.splice(ingredientIndex, 1);
                        break
                    case 'ustensil':
                        let ustensilIndex = this.taglist.indexOf(text);
                        this.taglist.splice(ustensilIndex, 1);
                        break
                    case 'appliance':
                        let applianceIndex = this.taglist.indexOf(text);
                        this.taglist.splice(applianceIndex, 1);
                }
        }
        console.log(this.taglist);
        document.getElementById(text).classList.add("hiden");
        document.getElementById(text).removeAttribute("id");
        this.filterRecipes();
    }

    filterRecipes(){
        this.finalRecipeList = [];
        if (this.taglist.length === 0){
            this.finalRecipeList = this.recipesFiltered
        }
        for (let tag of this.taglist) {
            for (let recipe of this.recipesFiltered) {
                let eligible = false;
                eligible = tag.isEligible(recipe) || eligible;
                if (eligible) {
                    this.finalRecipeList.push(recipe)
                }
            }
        }
        let cleanFinalList = Array.from(new Set(this.finalRecipeList))
        console.log(cleanFinalList)
        recipeList.createCards(cleanFinalList)

    }

}
