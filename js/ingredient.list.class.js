class IngredientList {

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db;
        this.recipes = recipeList.getRecipes()
        this.list  = new Array();
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        let array = [];
        array = this.db.getDatas().recipes
        console.log(array);
        this.createIngredientList(this.cleanIngredientList(array));
        this.ingredientSearchBar();
    }

    filtered(array){
        this.createIngredientList(this.cleanIngredientList(array));
        this.ingredientSearchBar();
    }

    allIngredientList(array) {
            let allIngredients = new Array();
            for (let p of array) {
                let ingredients = p.ingredients
                for (let n of ingredients) {
                    let ingredient = new Ingredient(
                        n.ingredient)
                    allIngredients.push(ingredient)
                }
            }
            return allIngredients;

    }

    cleanIngredientList(array) {
        let allIngredientsList = this.allIngredientList(array);
        const uniqueIngredient = Array.from(new Set(allIngredientsList.map(a => a.ingredient)))
            .map(ingredient => {
                return allIngredientsList.find(a => a.ingredient === ingredient)
            })
        this.list = uniqueIngredient;
        return uniqueIngredient;
    }

    sortByAlphabeticOrder() {
        let allIngredientsList = this.cleanIngredientList(array)
        allIngredientsList.sort(function (a, b) {
            return a.ingredient.localeCompare(b.ingredient);
        });
    }


    /**
     * Create the list from the clean list
     */
    createIngredientList(array) {
        document.querySelector(this.selector_id_list).innerHTML = "";
        let ingredientList = array;
        for (let i = 0; i < ingredientList.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += ingredientList[i].getIngredientHTML();
        }
    }


    ingredientSearchBar() {
        let searchBar = document.querySelector("#input__ingredient");
        searchBar.addEventListener('click', openDropdownIngredients);
        searchBar.addEventListener("keyup", e => {
            let searchStringBar = e.target.value.toLowerCase();
            const filteredIngredients = this.list.filter(ingredient => {
                return (
                    ingredient.ingredient.toLowerCase().includes(searchStringBar)
                );
            });
            document.querySelector(this.selector_id_list).innerHTML = "";
            this.createIngredientList(filteredIngredients);
        });
        searchBar.addEventListener('keydown', function(e){
            if (13 == e.keyCode) {
                if (searchBar.value !== '') {
                    let searchString = e.target.value.toLowerCase();
                    recipeList.getFilterTag('filter', 'ingredient', searchString);
                    searchBar.value = "";
                }
            }
        })
    }

}