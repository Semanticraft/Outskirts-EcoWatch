import { login, logout } from './users.js';
import { createLocation, pushLocation, locationList } from './locations.js';
import { getCoords } from './geoservice_api.js';
import { openSection } from './navigation.mjs';

console.log("starting main.js");

let itemCounter = 0;
let rowDiv;
let rowParent = document.getElementById('welcome-message');

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
function addLocationToList(location) {
    itemCounter++;
    // inserting row after every third element
    if(itemCounter % 3 == 1) {
        if (itemCounter > 1) {
            rowParent = rowDiv;
        }
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
    }

    let outerDiv = document.createElement('div');
    outerDiv.classList.add('col-md-4');
    outerDiv.classList.add('my-3');

    // outerDiv is the displayed image-thumbnail (3 next to each other)
    outerDiv.innerHTML = '<div class="img-thumbnail location">' +
                            '<a class="text-decoration-none">' +
                                '<img src="' + location.imagePath + '" alt="' + location.city + ' ' + location.street + '" class="img-thumbnail img-fluid">' +
                                '<div class="caption">' +
                                    '<p class="text-body" style="text-align: center;"><em>' + location.name + '</em>, ' + location.city + ', ' + location.zip + '. ' + location.description + '</p>' +
                                '</div>' +
                            '</a>' +
                        '</div>'

    rowDiv.appendChild(outerDiv);

    if (itemCounter % 3 == 1) {
        rowParent.insertAdjacentElement('afterend', rowDiv);
    }

    /*Setting the detail view to fit the location values*/
    outerDiv.onclick = function() {
        setUpdateScreenValues(location);
        openSection('update-and-delete');
    }
}

locationList.forEach(addLocationToList)


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

document.getElementById('add-form').onsubmit = async function() {
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
    )
    if (await getCoords(location)) {
        console.log("Loaded coordinates for location: " + JSON.stringify(location));
        pushLocation(location);
        addLocationToList(location);
        openSection('main');
    } else {
        console.log("Failed to getCoords() for location: " + JSON.stringify(location));
    }
    return false;
}