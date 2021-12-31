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

// What day in the date range in input has the highest trading volume?
// Output: date of highest trade volume and volume of trade in eur

async function searchVolume() {
    // Get dates from html form and get JSON data corresponding to the dates
    const startDate = document.getElementById("startDate").value;
    const endDate = +document.getElementById("endDate").value + ONE_HOUR;
    const data = await getJSON(config.baseURL + `?vs_currency=eur&from=${startDate}&to=${endDate}`);
    // Find the date with the highest volume from the data
    // total_volumes is an array of [date, volume], so we reduce the array by comparing the volumes and end up
    // with the highest volume
    const highestVolume = data.total_volumes
        .reduce((previous,current) => previous[1] > current[1] ? previous : current, [0,0]);

    // Display longest downward trend
    const element = document.getElementById("volume");
    element.innerHTML = `Largest trading volume is on date ${highestVolume[0]}.`;
}