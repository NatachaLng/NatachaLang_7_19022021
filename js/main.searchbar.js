
function searchBar (){
    let searchBar = document.querySelector("#mainSearchBar");
        searchBar.addEventListener('keyup', function (e) {
            if (searchBar.value.length >= 3) {
                document.getElementById('ustensil__tag').innerHTML = "";
                document.getElementById("appliance__tag").innerHTML = "";
                document.getElementById('ingredient__tag').innerHTML = "";
                let searchString = e.target.value.toLowerCase();
                recipeList.mainSearchBar(searchString);
            }
                if (13 == e.keyCode) {
                    searchBar.value = "";
                }
        });
}


