//filter function

function openDropdownIngredients() {
    document.getElementById("myDropDown__Ingredients").classList.toggle("show");
    document.getElementById("dropdown__trigered--ingredient").display = "block";
    document.getElementById("input__ingredient").classList.add("active");
    document.getElementById("input__ingredient").placeholder = "Rechercher un ingrédient"
}

function openDropdownUstensils() {
    document.getElementById("myDropDown__Ustensils").classList.toggle("show");
    document.getElementById("dropdown__trigered--ustensil").display = "block";
    document.getElementById("input__ustensils").classList.add("active");
    document.getElementById("input__ustensils").placeholder = "Rechercher un ustensil"
}

function openDropdownAppliances() {
    document.getElementById("myDropDown__Appliances").classList.toggle("show");
    document.getElementById("dropdown__trigered--appliance").display = "block";
    document.getElementById("input__appliance").classList.add("active");
    document.getElementById("input__appliance").placeholder = "Rechercher un appareil"
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        let ingredients = document.getElementById("input__ingredient");
        let ustensils = document.getElementById("input__ustensils");
        let appliances = document.getElementById("input__appliance")
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            }
        if (ingredients.classList.contains('active')){
            ingredients.classList.remove("active");
            ingredients.placeholder = "Ingredients"
        }
        if (ustensils.classList.contains('active')){
            ustensils.classList.remove("active");
            ustensils.placeholder = "Ustensils"
        }
        if (appliances.classList.contains('active')){
            appliances.classList.remove("active");
            appliances.placeholder = "Appareils"
        }
    }
}