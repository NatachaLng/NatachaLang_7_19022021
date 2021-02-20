class Database {
    url;
    database;

    /**
     * Constuctor transform class to unique object
     * @param url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Load Datas Async
     */
    async load() {
        let response = await fetch(this.url);
        let json = await response.json();
        this.saveDatabase(json);
    }

    /**
     * Save JSON in a property
     * @param datas
     */
    saveDatabase(datas) {
        console.log('saveDatabase');
        this.database = datas;
    }

    /**
     * Return all datas
     * @returns {*}
     */
    getDatas() {
        return this.database;
    }

}
