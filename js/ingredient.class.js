class Ingredient{

    /**
     *
     * @param ingredient
     * @param quantity
     * @param unit
     */

    constructor(ingredient, quantity, unit) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit
    }

    getHTML(){
        let template = `<li class="card__recipes--ingredient">${this.ingredient}: <span class="card__recipes--quantity">${this.quantity}${this.unit}</span></li>`
        return template
    }

}