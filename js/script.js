//https://twitter.github.io/typeahead.js/examples/

let recipeList
let ingredientList
let ustensilList
let applianceList
let filteredRecipeList

let dbRecipes= new Database("https://natachalng.github.io/les-petits-plats/data/recipes.json");

dbRecipes.load().then(
    function () {
        recipeList = new RecipesList("#card__reciper--list", dbRecipes);
        filteredRecipeList = new RecipesList ("#card__reciper--list", dbRecipes);
        ingredientList = new IngredientList("#ingredient__list",dbRecipes);
        ustensilList = new UstensilList("#ustensil__list", dbRecipes);
        applianceList = new ApplianceList("#appliance__list", dbRecipes);
        recipeList.init();
        ingredientList.init();
        ustensilList.init();
        applianceList.init();
    }
);
