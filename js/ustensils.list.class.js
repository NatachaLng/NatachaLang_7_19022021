class UstensilList {

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list
        this.db = db
        this.recipes = recipeList.getRecipes()
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        let array = [];
        array = this.db.getDatas().recipes
        this.createUstensilList(this.cleanUstensilsList(array));
        this.ustensilSearchBar();
    }

    filtered(array){
        this.createUstensilList(this.cleanUstensilsList(array));
        this.ustensilSearchBar();
    }

    allUstensilsList(array) {
            let allUstensils = new Array();
            for (let p of array) {
                let ustensils = p.ustensils
                for (let i = 0; i < ustensils.length ; i++){
                        let ustensil = new Ustensil(
                            ustensils[i])
                        allUstensils.push(ustensil)
                }
            }
            return allUstensils;
    }

    cleanUstensilsList(array){
            let allUstensilsList = this.allUstensilsList(array);
            const uniqueUstensil = Array.from(new Set(allUstensilsList.map(a => a.ustensil)))
                .map(ustensil => {
                    return allUstensilsList.find(a => a.ustensil === ustensil)
                })
            return uniqueUstensil;
        }

    sortByAlphabeticOrder(){
        let allUstensilsList = this.cleanUstensilsList()
        allUstensilsList.sort(function (a, b) {
            return a.ustensil.localeCompare(b.ustensil);
        });
    }

    /**
     * Create the list from the clean list
     */
    createUstensilList(array) {
        document.querySelector(this.selector_id_list).innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += array[i].getUstensilHTML();
        }

    }

    ustensilSearchBar() {
        let searchBar = document.querySelector("#input__ustensils");
        searchBar.addEventListener('click', openDropdownUstensils);
        searchBar.addEventListener("keyup", e => {
            let searchStringBar = e.target.value.toLowerCase();
            const filteredUstensils = this.cleanUstensilsList().filter(ustensil => {
                return (
                    ustensil.ustensil.toLowerCase().includes(searchStringBar)
                );
            });
            document.querySelector(this.selector_id_list).innerHTML = "";
            this.createUstensilList(filteredUstensils);
        });
        searchBar.addEventListener('keydown', function(e){
            if (13 == e.keyCode){
                let searchString = e.target.value.toLowerCase();
                console.log(searchString);
                recipeList.getFilterTag('filter', 'ustensil', searchString);
                searchBar.value = "";
            }
        })
    }
}