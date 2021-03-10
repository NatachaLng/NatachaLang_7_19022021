class IngredientList {

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
        this.recipes = recipeList.getRecipes()
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.allIngredientList();
        this.cleanIngredientList();
        this.sortByAlphabeticOrder();
        this.createIngredientList(this.cleanIngredientList());
        this.ingredientSearchBar();
    }

    allIngredientList() {
        {
            let allIngredients = new Array();
            for (let p of this.db.getDatas().recipes) {
                let ingredients = p.ingredients
                for (let n of ingredients) {
                    let ingredient = new Ingredient(
                        n.ingredient)
                    allIngredients.push(ingredient)
                }
            }
            return allIngredients;
        }
    }

    cleanIngredientList() {
        let allIngredientsList = this.allIngredientList();
        const uniqueIngredient = Array.from(new Set(allIngredientsList.map(a => a.ingredient)))
            .map(ingredient => {
                return allIngredientsList.find(a => a.ingredient === ingredient)
            })
        return uniqueIngredient;
    }

    sortByAlphabeticOrder() {
        let allIngredientsList = this.cleanIngredientList()
        allIngredientsList.sort(function (a, b) {
            return a.ingredient.localeCompare(b.ingredient);
        });
    }


    /**
     * Create the list from the clean list
     */
    createIngredientList(array) {
        let ingredientList = array;
        for (let i = 0; i < ingredientList.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += ingredientList[i].getIngredientHTML();
        }

    }

    filterByIngredient(text) {
        document.querySelector("#card__reciper--list").innerHTML = "";
        document.querySelector("#ingredient__tag").innerHTML = `<div class="ingredient tag">${text}<button name="close tag" class="tag__btn" onclick="ingredientList.filterByIngredient('all')"><i class="far fa-times-circle"></i></button> </div>`
        if (text !== 'all') {
            for (let i = 0; i < this.recipes.length; i++) {
                let ingredients = this.recipes[i].ingredients;
                for (let j = 0; j < ingredients.length; j++) {
                    let tags = ingredients[j].ingredient
                    let isMatch = (tags.indexOf(text) != -1)
                    if (isMatch) {
                        document.querySelector("#card__reciper--list").innerHTML += this.recipes[i].getCardHTML();
                    }
                }
            }
        } else {
            document.querySelector("#ingredient__tag").innerHTML = "";
            for (let i = 0; i < this.recipes.length; i++) {
                document.querySelector("#card__reciper--list").innerHTML += this.recipes[i].getCardHTML();
            }
        }
        let searchBar = document.querySelector("#input__ingredient");
        searchBar.value = "";
        return this.recipes
    }

    ingredientSearchBar() {
        let searchBar = document.querySelector("#input__ingredient");
        searchBar.addEventListener('click', openDropdownIngredients);
        searchBar.addEventListener("keyup", e => {
            let searchStringBar = e.target.value.toLowerCase();
            const filteredIngredients = this.cleanIngredientList().filter(ingredient => {
                return (
                    ingredient.ingredient.toLowerCase().includes(searchStringBar)
                );
            });
            document.querySelector(this.selector_id_list).innerHTML = "";
            this.createIngredientList(filteredIngredients);
        });
        searchBar.addEventListener('keydown', function(e){
            if (13 == e.keyCode){
                let searchString = e.target.value.toLowerCase();
                console.log(searchString)
                ingredientList.filterByIngredient(searchString);
                searchBar.value = "";
            }
        })
    }

}