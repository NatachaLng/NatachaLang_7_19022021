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
        for (let i = 0; i < recipe.ingredients.length ; i++){
            let ingredients = recipe.ingredients[i];
            if (ingredients.ingredient.indexOf(this.name) !== -1) {
                console.log(ingredients.ingredient)
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
            if (recipe.ustensils[i].indexOf(this.name) !== -1) {
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
            if (recipe.appliance.indexOf(this.name) !==-1) {
                return true;
            }
            return false
    }

}

class Filter {

    constructor() {
        this.recipesFiltered = recipeList.getRecipes();
        this.taglist = [];
        this.finalRecipeList = [];
    }

    createTagList(type, text){
        switch (type){
            case "ingredient":
                this.taglist.push(new IngredientTag(text));
                break;
            case "ustensil":
                this.taglist.push(new UstensilTag(text));
                break;
            case "appliance":
                this.taglist.push(new ApplianceTag(text))
                break;
            default: throw "error";
        }
        this.filterRecipes();
    }

    filterRecipes(){
        for (let tag of this.taglist) {
            for (let recipe of this.recipesFiltered) {
                let eligible = false;
                console.log(eligible, tag)
                eligible = tag.isEligible(recipe) || eligible;
                console.log(eligible);
                if (eligible) {
                    this.finalRecipeList.push(recipe)
                    console.log(this.finalRecipeList)
                }
            }
        }
    }

}
