let fs = require('fs');
let maw = require('./maps_api_wrapper');

// Returns maps_api_wrapper data as JSON
async function getMapsData(configuration) {
    return new Promise(resolve => {
        resolve(maw.getElevationData(configuration));
    });
}

// Fills a provided array:elevationValues with elevations
async function loadElevationValues(elevationValues, configuration) {
    let maps_data = await getMapsData(configuration);
    for(let i = 0; i < maps_data.results.length; ++i) {
        elevationValues.push(maps_data.results[i].elevation);
    }
}

// Prints provided array:elevationValues
function printElevationValues(elevationValues) {
    for(let i = 0; i < elevationValues.length; ++i) {
        console.log(elevationValues[i]);
    }
}

function loadElevationValuesToFile(filename, elevations) {
    let data='';
    for(let i = 0; i < elevations.length; ++i) {
        data += i + ' ' + elevations[i] + '\n';
    }
    fs.writeFile('./'+filename, data, err => {
        if(err) {
            console.log(err);
        }
    });
}

async function main() {
    
    let configuration = {
        lat: 27.9881 - (50*0.001),
        lng:  86.9250 - (50*0.001),
        latstep: 0.001,
        lngstep: 0.001,
        steps: 100
    };
    
    let elevationValues = [];
    
    await loadElevationValues(elevationValues, configuration);
    printElevationValues(elevationValues);
    loadElevationValuesToFile('elevations.dat', elevationValues);
}
main();