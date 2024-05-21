
export async function getCoords(location) {
    console.log("getCoords() - request: " + JSON.stringify(location));
    try {
        const response = await requestGeoService(location.street + ",+" + location.houseNumber + ",+" + location.zip + ",+" + location.city);
        console.log("getCoords() - result: " + JSON.stringify(response));
        if (response.length == 0) {
            throw new Error("Location not found");
        }
        location.lat = response[0].lat;
        location.lon = response[0].lon;
        return true;
    } catch (error) {
        alert("Error during getCoords: " + error.message);
        return false;
    }
}

async function requestGeoService(address) {
    try {
        const url = "https://nominatim.openstreetmap.org/search?q=" + address + "&format=json";
        console.log("URL: \"" + url + "\"");
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text(); 
            throw new Error("Error occured requesting location{" + address + "}: " + errorText);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}