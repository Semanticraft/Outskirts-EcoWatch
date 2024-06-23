import { openSection } from "./navigation.mjs";
import { disableElementsByClass } from "./util.js";

const userList = new Map([]);

var loggedIn = false;
var user = null;

// Adds new user to userList - if user does not exist yet
function addUser(username, password, role, name) {
    let userObj = {
        username: username, 
        password: password, 
        role: role, 
        name: name
    }
    if (userExists(username)) {
        console.log('Username"' + username + "' already exists!");
    } else {
        userList.set(username, userObj);
    }
}

function userExists(username) {
    return userList.has(username);
}

// hardcoded users
addUser('admina', 'password', 'admin', 'Mina');
addUser('normalo', 'password', 'non-admin', 'Norman');

// checks the login data and opens main section
function login(username, password) {
    if (userExists(username)) {
        console.log("username correct");
        console.log("user: " + JSON.stringify(userList.get(username)));
        if (userList.get(username).password === password) {
            console.log("password correct");
            loggedIn = true;
            user = userList.get(username);
            
            // Login successful!!!
            openSection('main');
            document.getElementById('welcome-message').innerHTML = 'Welcome, ' + user.name + '!';
            
            let isAdmin = user.role == "admin";
            let status = isAdmin ? 'block' : 'none';
            document.getElementById('add-button').style.display = status;
            document.getElementById('update-button').style.display = status;
            document.getElementById('delete-button').style.display = status;

            disableElementsByClass('update-input', !isAdmin);
        } else {
            alert("wrong password");
        }
    } else {
        alert("username '" + username + "' does not exist")
    }
}

// opens login section
function logout() {
    loggedIn = false;
    user = null;
    openSection('login');
}

export {addUser, login, logout};