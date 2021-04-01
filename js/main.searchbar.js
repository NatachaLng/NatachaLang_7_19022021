function searchBar (){
    let searchBar = document.querySelector("#mainSearchBar");
    searchBar.addEventListener('keydown', function (e) {
                document.getElementById('ustensil__tag').innerHTML = "";
                document.getElementById("appliance__tag").innerHTML = "";
                document.getElementById('ingredient__tag').innerHTML = "";
                let searchString = e.target.value.toLowerCase();
                searchTag.setName(searchString);
                filteredRecipeList.createTagList('filter', 'searchBar', searchTag);
        if (13 == e.keyCode) {
            filteredRecipeList.createTagList('filter', 'searchBar', searchTag);
            searchBar.value = "";
            }
        });
}

