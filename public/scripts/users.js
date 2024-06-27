import { postLogin } from "./api.js";
import { openSection } from "./navigation.mjs";
import { disableElementsByClass } from "./util.js";


// checks the login data and opens main section
function login(username, password) {
    /* 
    TODO:
    200: hide login page and show main
    401: alert "wrong credentials", show login page
    error: alert "something wrong", show login page
    */
   //console.log("Login! username: " + username + ", password: " + password)
   postLogin(username, password)
    .then(user => {
        
        // Login successful!!!
        openSection('main');
        document.getElementById('welcome-message').innerHTML = 'Welcome, ' + user.name + '!';
        
        let isAdmin = user.role == "admin";
        let status = isAdmin ? 'block' : 'none';
        document.getElementById('add-button').style.display = status;
        document.getElementById('update-button').style.display = status;
        document.getElementById('delete-button').style.display = status;

        disableElementsByClass('update-input', !isAdmin);
    }).catch(error => {
        alert("Wrong username or password!");
    })
}

// opens login section
function logout() {
    openSection('login');
}

export {login, logout};