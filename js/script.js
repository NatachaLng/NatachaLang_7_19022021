//https://twitter.github.io/typeahead.js/examples/

let Page
let ingredientList
let ustensilList
let applianceList

let dbRecipes= new Database("https://natachalng.github.io/NatachaLang_7_19022021/data/recipes.json");

dbRecipes.load().then(
    function () {
        Page = new RecipesList("#card__reciper--list", dbRecipes);
        ingredientList = new IngredientList(dbRecipes);
        ustensilList = new UstensilList(dbRecipes);
        applianceList = new ApplianceList(dbRecipes);
        Page.init();
        ingredientList.init();
        ustensilList.init();
        applianceList.init();
    }
);