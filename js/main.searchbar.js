
function searchBar (){
    let searchBar = document.querySelector("#mainSearchBar");
        searchBar.addEventListener('keydown', function (e) {
                let searchString = e.target.value.toLowerCase();
                recipeList.mainSearchBar(searchString);
            if (13 == e.keyCode) {
                let searchString = e.target.value.toLowerCase();
                recipeList.mainSearchBar(searchString);
                searchBar.value = "";
            }
        });
}


