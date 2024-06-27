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

export {createLocation};