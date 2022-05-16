getContrubutors();
function getContrubutors() {
    let fullName = sessionStorage.getItem('fullName');

    axios({
        method: 'get',
        url: 'https://api.github.com/repos/'+ fullName +'/contributors',
        responseType: 'stream'
    })
    .then(function (response) {
        builderContrubutors(response.data);
    });
}

function builderContrubutors(contributors) {
    
    cardsGroup = "";
    cards = "";
    indexCard = 0;

    contributors = contributors.slice(
        0, 
        (parseInt($("#number_of_contributors").val()) == 0) ? 1000 : parseInt($("#number_of_contributors").val())
    );

    contributors.forEach(builderLinesTable);

    console.log(contributors);

    if (cards != "") {
        cardsGroup += "<div class='card-group' style='margin-top: 5px;'>" + cards + "</div>";
    }

    $("#container-id").html(cardsGroup);
}

let cards = "";
let cardsGroup = "";
let indexCard = 0;
function builderLinesTable(item, index) {

    let contributions = parseInt($("#number_of_contributions").val());

    if (contributions <= parseInt(item.contributions)) {
        indexCard += 1;
    cards += `
        <div class="card col-md-4">
            <img class="card-img-top" src="${item.avatar_url}" alt="Avatar url" style="margin-top: 5px;">
            <div class="card-body">
                <h5 class="card-title">${item.login}</h5>
                <p class="card-text">Contributions: ${item.contributions}</p>
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
