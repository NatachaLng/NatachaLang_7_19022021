class Appliance {
    /**
     *
     * @param appliance
     */
    constructor(appliance) {
        this.appliance = appliance;
    }

    /**
     * Get Card HTML
     * @returns {string}
     */
    getApplianceHTML() {
        return `<li class="list__items appliance__tag" id="${this.appliance}" onclick="applianceList.filterByAppliance('${this.appliance}')">${this.appliance}</li>`;
    }
}