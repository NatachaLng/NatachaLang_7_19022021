class UstensilList {

    constructor(db) {
        this.db = db
    }

    /**
     * Init to load Datas and others event
     */
    init() {
        this.allUstensilsList();
        this.cleanUstensilsList();
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
            console.log(uniqueUstensil)
            return uniqueUstensil;
        }
}