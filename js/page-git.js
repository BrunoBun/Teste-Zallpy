getIssues();
function getIssues() {
    let fullName = sessionStorage.getItem('fullName');

    axios({
        method: 'get',
        url: 'https://api.github.com/repos/'+ fullName +'/issues',
        responseType: 'stream'
    })
    .then(function (response) {
        builderIssues(response.data);
    });
}

function builderIssues(issues) {
    
    cardsGroup = "";
    cards = "";
    indexCard = 0;

    issues.forEach(builderLinesTable);

    console.log(issues);

    if (cards != "") {
        cardsGroup += "<div class='card-group' style='margin-top: 5px;'>" + cards + "</div>";
    }

    $("#container-id").html(cardsGroup);
}

let cards = "";
let cardsGroup = "";
let indexCard = 0;
function builderLinesTable(item, index) {

    let status = $("#select-status").val();

    if (status == item.state) {

        indexCard += 1;
        cards += `
            <div class="card col-md-4">
                <img class="card-img-top" src="${item.user.avatar_url}" alt="Avatar url" style="margin-top: 5px;">
                <div class="card-body">
                    <h5 class="card-title">User: ${item.user.login}</h5>
                    <p class="card-text">Title: ${item.title}</p>
                </div>
                <div style='align-self: center; margin-bottom: 5px;'>
                </div>
            </div>
        `;
    
        if (indexCard == 3) {
            indexCard = 0;

            cardsGroup += "<div class='card-group' style='margin-top: 5px;'>" + cards + "</div>";
            cards = "";
        }

    }
    
}
