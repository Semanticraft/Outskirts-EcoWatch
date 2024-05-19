import { login, logout } from './users.js';
import { createLocation, pushLocation, locationList } from './locations.js';
import { getCoords } from './geoservice_api.js';
import { openSection } from './navigation.mjs';

console.log("starting main.js");

let rowDiv = document.getElementById('main-row-locations');

var selectedLocation;

// Sets all form-fields for update-screen
function setUpdateScreenValues(location) {
    document.getElementById('new-name').value = location.name;
    document.getElementById('new-description').value = location.description;
    document.getElementById('new-street').value = location.street;
    document.getElementById('new-house-number').value = location.houseNumber;
    document.getElementById('new-zip').value = location.zip;
    document.getElementById('new-city').value = location.city;
    document.getElementById('new-category').value = location.category;
    document.getElementById('latId').value = location.lat;
    document.getElementById('longId').value = location.lon;
    document.getElementById('new-temporary').checked = location.temporary;
    document.getElementById('update-and-delete-image').src = location.imagePath;
}

// Adds location to UI
function addLocationToUI(location) {

    let outerDiv = document.createElement('div');
    outerDiv.setAttribute("id", "location-" + location.id);
    outerDiv.classList.add('col-md-4');
    outerDiv.classList.add('my-3');

    // outerDiv is the displayed image-thumbnail (3 next to each other)
    outerDiv.innerHTML = getImgThumbnailString(location);

    rowDiv.appendChild(outerDiv);

    /*Setting the detail view to fit the location values*/
    outerDiv.onclick = function() {
        setUpdateScreenValues(location);
        openSection('update-and-delete');
        selectedLocation = location;
    }
}

locationList.forEach(addLocationToUI);

function updateLocationUI(location) {
    let listItem = document.getElementById("location-" + location.id);
    listItem.innerHTML = getImgThumbnailString(location);
}

function removeLocationFromUI(location) {
    let listItem = document.getElementById("location-" + location.id);
    listItem.style.display = 'none';
}

function getImgThumbnailString(location) {
    return '<div class="img-thumbnail location">' +
                '<a class="text-decoration-none">' +
                    '<img src="' + location.imagePath + '" alt="' + location.city + ' ' + location.street + '" class="img-thumbnail img-fluid">' +
                    '<div class="caption">' +
                        '<p class="text-body" style="text-align: center;"><em>' + location.name + '</em>, ' + location.city + ', ' + location.zip + '. ' + location.description + '</p>' +
                    '</div>' +
                '</a>' +
            '</div>';
}


// --------------------- SETUP EVENT-HANDLERS -----------------------

document.getElementById('login-form').onsubmit = function() {
    login(document.getElementById('username').value, document.getElementById('password').value);
    return false; // Prevent the default form submission behavior (don't reload page)
};

document.getElementById('logout-button').onclick = logout;

document.getElementById('cancel-update-and-delete').onclick = function() {
    openSection('main');
}

document.getElementById('add-button').onclick = function() {
    openSection('add');
}

document.getElementById('cancel-add').onclick = function() {
    openSection('main');
}

document.getElementById('delete-button').onclick = function() {
    removeLocationFromUI(selectedLocation);
    openSection('main');
}

document.getElementById('add-form').onsubmit = function() {
    const location = createLocation(
        document.getElementById("add_name").value,
        document.getElementById("add_description").value,
        document.getElementById("add_address_street").value,
        document.getElementById("add_address_no").value,
        document.getElementById("add_address_zip").value,
        document.getElementById("add_address_city").value,
        document.getElementById("add_category").value,
        document.getElementById("add_temporary_check").checked,
        document.getElementById("imagesUpload").src
    );
    getCoords(location).then(submit => {
        if (submit) {
            console.log("Loaded coordinates for location: " + JSON.stringify(location));
            pushLocation(location);
            addLocationToUI(location);
            openSection('main');
            // TODO - if add suceeds all fields need to be reset
        } else {
            console.log("Failed to getCoords() for location: " + JSON.stringify(location));
        }
    }).catch(error => console.log(error));
    return false;
}

document.getElementById('update-and-delete-form').onsubmit = function() {
    const location = createLocation(
        document.getElementById("new-name").value,
        document.getElementById("new-description").value,
        document.getElementById("new-street").value,
        document.getElementById("new-house-number").value,
        document.getElementById("new-zip").value,
        document.getElementById("new-city").value,
        document.getElementById("new-category").value,
        document.getElementById("new-temporary").checked,
        document.getElementById("update-and-delete-image").src
    );
    
    getCoords(location).then(success => {
        if (success) {
            console.log("Loaded coordinates for location: " + JSON.stringify(location));
            
            selectedLocation.name = location.name;
            selectedLocation.description = location.description;
            selectedLocation.street = location.street;
            selectedLocation.houseNumber = location.houseNumber;
            selectedLocation.zip = location.zip;
            selectedLocation.city = location.city;
            selectedLocation.lat = location.lat;
            selectedLocation.lon = location.lon;
            selectedLocation.category = location.category;
            selectedLocation.temporary = location.temporary;

            openSection('main');
            updateLocationUI(selectedLocation);
        } else {
            console.log("Failed to getCoords() for location: " + JSON.stringify(location));
        }
    }).catch(error => console.log(error));
    return false;
}