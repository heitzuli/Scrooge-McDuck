//Fetch data in JSON format
function getJSON(url) {
    // Fetches from given URL
    return fetch(url)
        // Turns it into json
        .then(function (response) {
            return response.json();
        })
}

function search() {
    //console.log(document.getElementById("startDate").value);
    //console.log(document.getElementById("endDate").value);

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const found = getJSON(config.baseURL + `?vs_currency=eur&from=${startDate}&to=${endDate}`);
    console.log(found);

    /*const searchTerm = document.getElementById('search').value;
    const foundIt = smileys.hasOwnProperty(searchTerm);
    if (foundIt) {
        displayImg(smileys[searchTerm], 'emoji');
    } else {
        deleteImg('emoji');
    }*/
}