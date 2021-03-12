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
        for (let i = 0; i < recipe.ingredients.length; i++){
            if (recipe.ingredients[i].ingredient.indexOf(this.name)) {
                return true;
                }
            return false
            }
        }

}

class UstensilTag extends Tag {

    constructor(name) {
        super();
        this.name = name;
    }

    isEligible(recipe) {
        for (let i = 0; i < recipe.ustensils.length; i++){
            if (recipe.ustensils[i].indexOf(this.name)) {
                return true;
            }
            return false
        }
    }

}

class ApplianceTag extends Tag {

    constructor(name) {
        super();
        this.name = name;
    }

    isEligible(recipe) {
            if (recipe.appliance.indexOf(this.name)) {
                return true;
            }
            return false
    }

}

new Tag().isEligible()

let taglist = []
let Recipes = recipeList.getRecipes();
let finalRecipeList = [];

class Filter {

    createTagList(type, text){
        switch (type){
            case "ingredient":
                taglist.push(new IngredientTag(text));
                break;
            case "ustensil":
                taglist.push(new UstensilTag(text));
                break;
            case "appliance":
                taglist.push(new ApplianceTag(text))
                break;
        }
        this.filterRecipes();
    }

    filterRecipes(){
        for (let recipe of Recipes) {
            let eligible = true;
            for (let tag of taglist) {
                if (!tag.isEligible(recipe)) {
                    eligible = false;
                }
            }
            if (eligible == true) {
                finalRecipeList.push(recipe)
            }
        }
    }

}
