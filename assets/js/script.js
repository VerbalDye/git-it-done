var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {

    //format the api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        };
    })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function (repos, searchTerm) {

    // check if the return array is empty
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    };

    // reset content at beginnig of function
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loops over repos
    for (var i = 0; i < repos.length; i++) {

        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // makes a container for each of the repo elements
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.href = "./single-repo.html?repo=" + repoName;

        // create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // appending time
        repoEl.appendChild(titleEl);

        // create issues element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if issues exist
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // make appends
        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    };
};

userFormEl.addEventListener("submit", formSubmitHandler);