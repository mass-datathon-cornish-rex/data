var fs = require('fs');

function getGeoJson(filePrefix) {
    var featureCollection = {
        'type': 'FeatureCollection',
        'features': []
    };

    fs.readFile(filePrefix + '.json', 'utf8', function (err, data) {
        if (err) throw err;
        var rows = data.split('\n');
        var row, feature, geometry, key, i, j, lenI, lenJ;
        for (i = 1, lenI = rows.length - 1; i < lenI; ++i) {
            if (i > 100) {
                break;
            }
            row = JSON.parse(rows[i].substr(1, rows[i].length - 2));
            geometry = JSON.parse(row.st_asgeojson);
            feature = {
                'type': 'Feature',
                'geometry': {
                    type: geometry.type,
                    coordinates: geometry.coordinates
                },
                'properties': {}
            };
            for (key in row) {
                if (key !== 'st_asgeojson' && row.hasOwnProperty(key)) {
                    feature.properties[key] = '' + row[key];
                }
            }
            featureCollection.features.push(feature);
        }
        fs.writeFile(filePrefix + '.geojson', JSON.stringify(featureCollection), function (err) {
            if (err) throw err;
        })
    });
}

getGeoJson(process.argv[2]);