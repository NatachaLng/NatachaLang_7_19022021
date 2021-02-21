class Recipes {

    /**
     *
     * @param id
     * @param name
     * @param servings
     * @param ingredients
     * @param time
     * @param description
     * @param appliance
     * @param ustensils
     */

    constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
            this.id = id;
            this.name = name;
            this.servings = servings;
            this.ingredients = ingredients
            this.time = time;
            this.description = description;
            this.appliance = appliance;
            this.ustensils = ustensils
    }


    getCardHTML() {
        let article = `<article class="card">
            <div class="card__img--placeholder">

            </div>
            <div class="card__container">
                <div class="card__details">
                    <h2 class="card__details--title">${this.name}</h2>
                    <div class="card__details--time"><i class="far fa-clock"></i> ${this.time} min </div>
                </div>
                <div class="card__recipe">
                    <ul class="card__recipes--details">
                        ${this.ingredients.map(ingredient => `<li class="card__recipes--ingredient">${ingredient.ingredient} <span class="card__recipes--quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`).join('')}
                       </ul>
                    <div class="card__recipes--explanation">${this.description}</div>
                </div>
            </div>
        </article>`;
        return article;
    }

    getIngredientList(){

    }
}