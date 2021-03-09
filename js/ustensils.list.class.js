class UstensilList {

    constructor(selector_id_list, db) {
        this.selector_id_list = selector_id_list
        this.db = db
        this.recipes = Page.getRecipes()
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.allUstensilsList();
        this.cleanUstensilsList();
        this.sortByAlphabeticOrder();
        this.createUstensilList(this.cleanUstensilsList());
        this.ustensilSearchBar();
    }

    allUstensilsList() {
        {
            let allUstensils = new Array();
            for (let p of this.db.getDatas().recipes) {
                let ustensils = p.ustensils
                for (let i = 0; i < ustensils.length ; i++){
                        let ustensil = new Ustensil(
                            ustensils[i])
                        allUstensils.push(ustensil)
                }
            }
            return allUstensils;
        }
    }

    cleanUstensilsList(){
            let allUstensilsList = this.allUstensilsList();
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
        for (let i = 0; i < array.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += array[i].getUstensilHTML();
        }

    }

    filterByUstensil(text) {
        document.querySelector("#card__reciper--list").innerHTML = "";
        document.querySelector("#ustensil__tag").innerHTML = `<div class="ustensil tag">${text}<button name="close tag" class="tag__btn" onclick="ustensilList.filterByUstensil('all')"><i class="far fa-times-circle"></i></button> </div>`
        if (text !== 'all') {
            for (let i = 0; i < this.recipes.length; i++) {
                let ustensils = this.recipes[i].ustensils;
                for (let j = 0; j < ustensils.length; j++) {
                    let tags = ustensils[j];
                    let isMatch = (tags.indexOf(text) != -1)
                    if (isMatch) {
                        document.querySelector("#card__reciper--list").innerHTML += this.recipes[i].getCardHTML();
                    }
                }
            }
        } else {
            document.querySelector("#ustensil__tag").innerHTML = "";
            for (let i = 0; i < this.recipes.length; i++) {
                document.querySelector("#card__reciper--list").innerHTML += this.recipes[i].getCardHTML();
            }
        }
        let searchBar = document.querySelector("#input__ustensils");
        searchBar.value = "";
        return this.recipes
    }

    ustensilSearchBar() {
        console.log(this.cleanUstensilsList())
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
                console.log(searchString)
                ustensilList.filterByUstensil(searchString);
                searchBar.value = "";
            }
        })
    }
}