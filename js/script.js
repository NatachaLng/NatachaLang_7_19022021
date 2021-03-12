//https://twitter.github.io/typeahead.js/examples/

let recipeList
let ingredientList
let ustensilList
let applianceList
let filteredRecipeList

let dbRecipes= new Database("https://natachalng.github.io/NatachaLang_7_19022021/data/recipes.json");

dbRecipes.load().then(
    function () {
        recipeList = new RecipesList("#card__reciper--list", dbRecipes);
        filteredRecipeList = new Filter();
        ingredientList = new IngredientList("#ingredient__list",dbRecipes);
        ustensilList = new UstensilList("#ustensil__list", dbRecipes);
        applianceList = new ApplianceList("#appliance__list", dbRecipes);
        recipeList.init();
        ingredientList.init();
        ustensilList.init();
        applianceList.init();
    }
);