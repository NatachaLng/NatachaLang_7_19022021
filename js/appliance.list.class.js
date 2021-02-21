class ApplianceList {

    constructor(db) {
        this.db = db
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.allAppliancesList();
        this.cleanAppliancesList();
        this.sortByAlphabeticOrder();
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
            console.log(uniqueAppliance)
            return uniqueAppliance;
        }

        sortByAlphabeticOrder(){
            let allAppliancesList = this.cleanAppliancesList()
            allAppliancesList.sort(function (a, b) {
                return a.appliance.localeCompare(b.appliance);
        });
        console.log(allAppliancesList)
}
}