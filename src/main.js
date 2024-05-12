import {userList} from './users.js';
import { locationList } from './locations.js';

let itemCounter = 0;
let rowDiv;
locationList.forEach(location => {
    itemCounter++;
    if(itemCounter % 3 == 1) {
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
    }

    var outerDiv = document.createElement('div');
    outerDiv.classList.add('col-md-4');
    outerDiv.classList.add('my-3');

    outerDiv.innerHTML = '<div class="img-thumbnail location">' +
                            '<a class="text-decoration-none">' +
                                '<img src="' + location.imagePath + '" alt="' + location.city + ' ' + location.street + '" class="img-thumbnail img-fluid">' +
                                '<div class="caption">' +
                                    '<p class="text-body" style="text-align: center;"><em>' + location.name + '</em>, ' + location.city + ', ' + location.zip + '. ' + location.description + '</p>' +
                                '</div>' +
                            '</a>' +
                        '</div>'

    rowDiv.appendChild(outerDiv);

    var parentElement = document.getElementById('welcome-message');

    parentElement.insertAdjacentElement('afterend', rowDiv);
})

function login(username, password) {
    if (userList.has(username)) {
        if(userList.get(username)[0] == password) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            document.getElementById('welcome-message').innerHTML = 'Welcome, ' + userList.get(username)[2] + '!';
            if(userList.get(username)[1] == 'admin') {
                document.getElementById('add-button').style.display = 'block';
                document.getElementById('update-button').style.display = 'block';
                document.getElementById('delete-button').style.display = 'block';
            } else {
                document.getElementById('add-button').style.display = 'none';
                document.getElementById('update-button').style.display = 'none';
                document.getElementById('delete-button').style.display = 'none';
            }
        } else {
            alert('The password is incorrect.');
        }
    } else {
        alert('The username does not exist.');
    }
}

function logout() {
    let sections = document.getElementsByTagName('section');
    for (var i = 1; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById('login').style.display = 'block';
}

document.getElementById('login-button').onclick = function() {
    login(document.getElementById('username').value, document.getElementById('password').value);
};

document.getElementById('logout-button').onclick = logout;

let locations = document.getElementsByClassName('location');
Array.from(locations).forEach(location => {
    location.onclick = function() { 
        document.getElementById('main').style.display = 'none';
        document.getElementById('update-and-delete').style.display = 'block';
    }
});

document.getElementById('cancel-button').onclick = function() {
    document.getElementById('main').style.display = 'block';
    document.getElementById('update-and-delete').style.display = 'none';
}