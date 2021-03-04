class IngredientList {

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list;
        this.db = db
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        console.log('init()');
        this.allIngredientList();
        this.cleanIngredientList();
        this.sortByAlphabeticOrder();
        this.createIngredientList()
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
            console.log(allIngredients)
            return allIngredients;
        }
    }

    cleanIngredientList() {
        let allIngredientsList = this.allIngredientList();
        const uniqueIngredient = Array.from(new Set(allIngredientsList.map(a => a.ingredient)))
            .map(ingredient => {
                return allIngredientsList.find(a => a.ingredient === ingredient)
            })
        console.log(uniqueIngredient)
        return uniqueIngredient;
    }

    sortByAlphabeticOrder() {
        let allIngredientsList = this.cleanIngredientList()
        allIngredientsList.sort(function (a, b) {
            return a.ingredient.localeCompare(b.ingredient);
        });
        console.log(allIngredientsList)
    }



    /**
     * Create the list from the clean list
     */
    createIngredientList() {
        let ingredientList = this.cleanIngredientList();
        console.log(ingredientList)
        for (let i = 0; i < ingredientList.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += ingredientList[i].getHTML();
        }

    }

    filterRecipes(text) {
        document.querySelector("#card__reciper--list").innerHTML = "";
        let recipes = Page.getRecipes();
        console.log(recipes)
            for (let i = 0; i < recipes.length; i++) {
                let ingredients = recipes[i].ingredients;
                for (let j = 0; j < ingredients.length; j++){
                    let tags = ingredients[j].ingredient
                        let isMatch = (tags.indexOf(text) != -1)
                    if (isMatch) {
                        document.querySelector("#card__reciper--list").innerHTML += recipes[i].getCardHTML();
                    }
                }
            }
        }
}