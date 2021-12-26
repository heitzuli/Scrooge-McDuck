// One hour in seconds
const ONE_HOUR = 60 * 60;

//Fetch data in JSON format
function getJSON(url) {
    // Fetches from given URL
    return fetch(url)
        // Turns it into json
        .then(function (response) {
            return response.json();
        })
}

async function searchLDS() {
    // TODO: Verify both start and end date exist and are valid dates
    const startDate = document.getElementById("startDate").value;
    const endDate = +document.getElementById("endDate").value + ONE_HOUR;
    const data = await getJSON(config.baseURL + `?vs_currency=eur&from=${startDate}&to=${endDate}`);

    // We're assuming every day has at least one price at midnight
    // Prices array looks like [date, price]. Aka the price is taken from prices array, place 1.
    const pricesWithoutDate = data.prices.map(array => array[1]);
    // Call function to find longest downward trend
    const longestDownwardTrend = lengthOfLongestDownwardTrend(pricesWithoutDate);
    // Display longest downward trend
    const element = document.getElementById("lds");
    element.innerHTML = `Longest bearish trend is ${longestDownwardTrend} days.`;
}