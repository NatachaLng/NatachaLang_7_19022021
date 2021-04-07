class ApplianceList {

    constructor(selector_id_list, db) {
        this.db = db
        this.selector_id_list = selector_id_list
        this.recipes = recipeList.getRecipes();
        this.list = new Array();
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        let array = [];
        array = this.db.getDatas().recipes;
        this.createApplianceList(this.cleanAppliancesList(array));
        this.applianceSearchBar();
    }

    /**
     *
     * @param array
     */
    filtered(array){
        this.createApplianceList(this.cleanAppliancesList(array));
        this.applianceSearchBar();
    }

    /**
     *
     * @param array
     * @return {any[]}
     */
    allAppliancesList(array) {
        let allAppliances = new Array();
        for (let p of array) {
            let appliances = p.appliance
            let appliance = new Appliance(appliances)
            allAppliances.push(appliance);
        }
        return allAppliances;
    }

    /**
     *
     * @param array
     * @return {*[]}
     */
    cleanAppliancesList(array){
        let allAppliancesList = this.allAppliancesList(array);
        const uniqueAppliance = Array.from(new Set(allAppliancesList.map(a => a.appliance)))
            .map(appliance => {
                return allAppliancesList.find(a => a.appliance === appliance)
            })
        this.list = uniqueAppliance
        return uniqueAppliance;
    }

    /**
     * Create the list from the clean list
     */
    createApplianceList(array) {
        document.querySelector(this.selector_id_list).innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += array[i].getApplianceHTML();
        }

    }

    /**
     * Searchbar
     */
    applianceSearchBar() {
        let searchBar = document.querySelector("#input__appliance");
        searchBar.addEventListener('click', openDropdownAppliances);
        searchBar.addEventListener("keyup", e => {
            let searchStringBar = e.target.value.toLowerCase();
            const filteredAppliances = this.list.filter(appliance => {
                return (
                    appliance.appliance.toLowerCase().includes(searchStringBar)
                );
            });
            document.querySelector(this.selector_id_list).innerHTML = "";
            this.createApplianceList(filteredAppliances);
        });
        searchBar.addEventListener('keydown', function(e){
            if (13 == e.keyCode) {
                if (searchBar.value !== '') {
                    let searchString = e.target.value.toLowerCase();
                    console.log(searchString)
                    filteredRecipeList.createTagList('filter', 'appliance', searchString);
                    searchBar.value = "";
                }
            }
        })
    }
}