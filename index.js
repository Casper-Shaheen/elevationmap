let fs = require('fs');
let maw = require('./maps_api_wrapper');

// Fills a provided array:elevationValues with elevations
async function loadElevationValues(configuration, elevationValues) {
    return new Promise(resolve => {
        let mapsData = [];
        maw.getMapsData(configuration, mapsData).then(() => {
            for(let i = 0; i < mapsData[0].results.length; ++i) {
                //console.log(i)
                elevationValues.push(mapsData[0].results[i].elevation);
            }
            resolve();
        });
    });
}

// Prints provided array:elevationValues
function printElevationValues(elevationValues) {
    for(let i = 0; i < elevationValues.length; ++i) {
        console.log(elevationValues[i]);
    }
}

async function loadElevationValuesToFile(filename, elevations) {
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
    
    loadElevationValues(configuration, elevationValues).then(() => {
        // printElevationValues(elevationValues);
        loadElevationValuesToFile('elevations.dat', elevationValues);
    });
}
main();