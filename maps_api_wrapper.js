let https = require('https');
let utilities = require('./utilities');

const HOST = 'maps.googleapis.com';
const PORT = 443;
const PATH = '/maps/api/elevation/json'

async function getElevationData(configuration) {
    return new Promise(resolve => {
        let requestOptions = {
            host: HOST,
            port: PORT,
            path: PATH 
            + utilities.generateElevationQueryString(configuration.lat,
                                    configuration.lng,
                                    configuration.latstep,
                                    configuration.lngstep,
                                    configuration.steps),
            method: 'GET'
        };
        
        let data = ''
        let req = https.request(requestOptions, res => {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers, null, 2));
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
        req.end();
    });   
}

module.exports.getElevationData = getElevationData;