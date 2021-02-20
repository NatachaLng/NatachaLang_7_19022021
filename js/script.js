//https://twitter.github.io/typeahead.js/examples/

let Page

let dbRecipes= new Database("https://natachalng.github.io/NatachaLang_7_19022021/data/recipes.json");

dbPhotographers.load().then(
    function () {
        Page = new RecipesList("#card__container", dbRecipes);
        Page.init();
    }
);