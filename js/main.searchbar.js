const recipeContainer = document.getElementById("card__reciper--list")
const searchBar = document.getElementById("mainSearchBar");
let recipes = [];

console.log(searchBar);

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredRecipes = recipes.filter((recipes) => {
        return (
            recipes.name.toLowerCase().includes(searchString) ||
            recipes.description.toLowerCase().includes(searchString)
        );
    });
    displayRecipes(filteredRecipes);
});

const loadRecipes = async () => {
    try {
        const res = await fetch('https://natachalng.github.io/NatachaLang_7_19022021/data/recipes.json');
        recipes = await res.json();
        displayRecipes(recipes);
    } catch (err) {
        console.error(err);
    }
};


const displayRecipes = (recipes) => {
    const htmlString = recipes
        .map((recipe) => {
            return `<article class="card">
            <div class="card__img--placeholder">

            </div>
            <div class="card__container">
                <div class="card__details">
                    <h2 class="card__details--title">${recipe.name}</h2>
                    <div class="card__details--time"><i class="far fa-clock"></i> ${recipe.time} min </div>
                </div>
                <div class="card__recipe">
                    <ul class="card__recipes--details">
                        ${recipe.ingredients.map(ingredient => `<li class="card__recipes--ingredient">${ingredient.ingredient} <span class="card__recipes--quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`).join('')}
                       </ul>
                    <div class="card__recipes--explanation">${recipe.description}</div>
                </div>
            </div>
        </article>`;;
        })
        .join('');
    recipeContainer.innerHTML = htmlString;
};


loadRecipes();