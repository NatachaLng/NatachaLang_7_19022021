class IngredientList {

    constructor(db) {
        this.db = db
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        console.log('init()');
        this.allIngredientList();
        this.cleanIngredientList();
        this.sortByAlphabeticOrder()
    }

    allIngredientList() {
        {
            let allIngredients = new Array();
            for (let p of this.db.getDatas().recipes) {
                let ingredients = p.ingredients
                for (let n of ingredients){
                        let ingredient = new Ingredient(
                            n.ingredient)
                        allIngredients.push(ingredient)
                }
            }
            console.log(allIngredients)
            return allIngredients;
        }
    }

    cleanIngredientList(){
            let allIngredientsList = this.allIngredientList();
            const uniqueIngredient = Array.from(new Set(allIngredientsList.map(a => a.ingredient)))
                .map(ingredient => {
                    return allIngredientsList.find(a => a.ingredient === ingredient)
                })
            console.log(uniqueIngredient)
            return uniqueIngredient;
        }

    sortByAlphabeticOrder(){
        let allIngredientsList = this.cleanIngredientList()
        allIngredientsList.sort(function (a, b) {
            return a.ingredient.localeCompare(b.ingredient);
        });
        console.log(allIngredientsList)
    }
}