getRepositories();

function getRepositories() {

    axios({
        method: 'get',
        url: 'https://api.github.com/repositories',
        responseType: 'stream'
    })
    .then(function (response) {
        builderTableRepositories(response.data);
    });
}

function builderTableRepositories(repositories) {
    
    repositories.forEach(builderLinesTable);

    $("#container-id").html(cardsGroup);
}

let cards = "";
let cardsGroup = "";
let indexCard = 0;
function builderLinesTable(item, index) {

    indexCard += 1;
    cards += `
        <div class="card col-md-4">
            <img class="card-img-top" src="${item.owner.avatar_url}" alt="Avatar url" style="margin-top: 5px;">
            <div class="card-body">
                <h5 class="card-title">${item.full_name}</h5>
                <p class="card-text">Description: ${item.description}</p>
            </div>
            <div style='align-self: center; margin-bottom: 5px;'>
                <button type="button" class="btn btn-primary" onclick="openDetailOtherPage('${item.full_name}')">Contributors</button>
                <button type="button" class="btn btn-primary" onclick="openDetailIssues('${item.full_name}')">Issues</button>
            </div>
        </div>
    `;

    if (indexCard == 3) {
        indexCard = 0;

        cardsGroup += "<div class='card-group' style='margin-top: 5px;'>" + cards + "</div>";
        cards = "";
    }
}

function openDetailOtherPage(fullName) {

    sessionStorage.setItem('fullName', fullName);

    window.location="contributors.html";
}

function openDetailIssues(fullName) {

    sessionStorage.setItem('fullName', fullName);

    window.location="issues.html";
}
