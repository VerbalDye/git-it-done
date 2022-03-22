// get elements on page for later
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

// queries the github api for the info that we want
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(response) {

        // checks of the response came back okay
        if (response.ok) {
            
            // converts to JSON
            response.json().then(function(data) {

                // sends the response to the display functio
                displayIssues(data);

                // displays the warning for there are more entries than we can display
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                };
            });
        } else {
            
            // lets the user know if there is an issue
            alert("There was a problem with your request!");
        }
    })
}


var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {

        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.href = issues[i].html_url;
        issueEl.target = "_blank";

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.href = "https://www.github.com/" + repo + "/issues";
    linkEl.target = "_blank";

    limitWarningEl.appendChild(linkEl);
}

getRepoIssues("facebook/react");