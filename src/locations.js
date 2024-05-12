const locationList = new Array();

function addLocation(name, description, street, housenumber, zip, city, category, temporary, imagePath) {
    const longitude = 0;
    const latitude = 0;

    const newLocation = {
        name: name,
        description: description,
        street: street,
        housenumber: housenumber,
        zip: zip,
        city: city,
        category: category,
        temporary: temporary,
        longitude: longitude,
        latitude: latitude, 
        imagePath: imagePath
    };

    locationList.push(newLocation);
}

addLocation(
    'Fehlende Infrastruktur', 
    'Von hier aus gesehen sind es etwa 3 Kilometer um bis zu den nächsten S-Bahnen und U-Bahnen zu gelangen.',
    'Brunsbütteler Damm',
    '259',
    '13591',
    'Berlin',
    'Infrastructure',
    true,
    './images/spandau-brunsbueteller-damm-261.PNG'
);
addLocation(
    'Fehlende Infrastruktur 2', 
    'Von hier sind es sogar in etwa 3,5 bis 4 Kilometer.',
    'Falkenseer Chausee',
    '200',
    '13589',
    'Berlin',
    'Infrastructure',
    true,
    './images/spandau-am-kiesteich.PNG'
);
addLocation(
    'Mangelhafte Radwege', 
    'Hier sind die Fahrradwege sehr schmal und teils von anderen Fahrzeugen blockiert.',
    'Waltersdorfer Straße',
    '61',
    '13589',
    'Berlin',
    'Infrastructure',
    true,
    './images/treptow-koepenik-waltersdorfer-strasse.PNG'
);

export {locationList};