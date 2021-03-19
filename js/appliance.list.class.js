class ApplianceList {

    constructor(selector_id_list, db) {
        this.db = db
        this.selector_id_list = selector_id_list
        this.recipes = recipeList.getRecipes();
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.allAppliancesList();
        this.cleanAppliancesList();
        this.sortByAlphabeticOrder();
        this.createApplianceList(this.cleanAppliancesList());
        this.applianceSearchBar();
    }

    allAppliancesList() {
        {
            let allAppliances = new Array();
            for (let p of this.db.getDatas().recipes) {
                let appliances = p.appliance
                let appliance = new Appliance(appliances)
                allAppliances.push(appliance);
            }
            return allAppliances;
        }
    }

    cleanAppliancesList(){
            let allAppliancesList = this.allAppliancesList();
            const uniqueAppliance = Array.from(new Set(allAppliancesList.map(a => a.appliance)))
                .map(appliance => {
                    return allAppliancesList.find(a => a.appliance === appliance)
                })
            return uniqueAppliance;
        }

        sortByAlphabeticOrder(){
            let allAppliancesList = this.cleanAppliancesList()
            allAppliancesList.sort(function (a, b) {
                return a.appliance.localeCompare(b.appliance);
        });
}

    /**
     * Create the list from the clean list
     */
    createApplianceList(array) {
        for (let i = 0; i < array.length; i++) {
            document.querySelector(this.selector_id_list).innerHTML += array[i].getApplianceHTML();
        }

    }

    applianceSearchBar() {
        let searchBar = document.querySelector("#input__appliance");
        searchBar.addEventListener('click', openDropdownAppliances);
        searchBar.addEventListener("keyup", e => {
            let searchStringBar = e.target.value.toLowerCase();
            const filteredAppliances = this.cleanAppliancesList().filter(appliance => {
                return (
                    appliance.appliance.toLowerCase().includes(searchStringBar)
                );
            });
            document.querySelector(this.selector_id_list).innerHTML = "";
            this.createApplianceList(filteredAppliances);
        });
        searchBar.addEventListener('keydown', function(e){
            if (13 == e.keyCode){
                let searchString = e.target.value.toLowerCase();
                console.log(searchString)
                recipeList.getFilterTag('filter', 'appliance', searchString);
                searchBar.value = "";
            }
        })
    }
}