function generateElevationQueryString(lng, lat, lngstep, latstep, steps){
    // Start building the query string with the parameter
    let queryString = '?locations=';
    // Iterate for the number of steps, adding a new coordinate pair
    // on each iteration
    for(let i = 0; i < steps; ++i) {
        queryString += lat.toFixed(2) + '%2C' + lng.toFixed(2) + '|'
        lng += lngstep;
        lat += latstep;
    }
    // Remove the last pipe character
    queryString = queryString.substring(0, queryString.length-1);
    queryString += '&key=AIzaSyDih4nBfyrJZoMZlJK7p2mrJfzVqzwrhgQ'
    return queryString
}

module.exports.generateElevationQueryString = generateElevationQueryString;