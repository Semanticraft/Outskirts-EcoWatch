const locationList = new Array();

function addLocation(name, description, street, houseNumber, zip, city, category, temporary, imagePath) {
    pushLocation(createLocation(name, description, street, houseNumber, zip, city, category, temporary, imagePath));
}

function pushLocation(location) {
    location.id = locationList.length;
    locationList.push(location);
}

function createLocation(name, description, street, houseNumber, zip, city, category, temporary, imagePath) {
    return {
        name: name,
        description: description,
        street: street,
        houseNumber: houseNumber,
        zip: zip,
        city: city,
        category: category,
        temporary: temporary,
        lon: 0,
        lat: 0, 
        imagePath: imagePath
    };
}

addLocation(
    'Fehlende Infrastruktur', 
    'Von hier aus gesehen sind es etwa 3 Kilometer um bis zu den nächsten S-Bahnen und U-Bahnen zu gelangen.',
    'Brunsbütteler Damm',
    '259',
    '13591',
    'Berlin',
    '2',
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
    '2',
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
    '1',
    true,
    './images/treptow-koepenik-waltersdorfer-strasse.PNG'
);

export {locationList, createLocation, pushLocation};