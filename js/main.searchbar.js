
function searchBar (){
    let searchBar = document.querySelector("#mainSearchBar");
    searchBar.addEventListener ('keydown', function(e){
        if (13 == e.keyCode){
            let searchString = e.target.value.toLowerCase();
            recipeList.getFilterTag('filter', 'searchbar', searchString);
            searchBar.value = "";
        }
    });
}


