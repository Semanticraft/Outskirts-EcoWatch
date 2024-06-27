const domain = "http://localhost:8000/"

export async function postLogin(username, password) {
    const user = {
        "username": username, 
        "password": password
    }
    try {
        const response = await fetch(domain + "users", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text(); 
            throw new Error("Login not successful: " + errorText);
        }
    } catch (error) {
        throw error;
    }
}

export async function postLocation(location) {
    try {
        delete location._id
        const response = await fetch(domain + "loc", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
          });
        if (response.ok) {
            location._id = response.headers.get('Location').replace('/loc/', '');
            return response.text();
        } else {
            const errorText = await response.text(); 
            throw new Error("POST location not successful: " + errorText);
        }
    } catch (error) {
        throw error;
    }
}

export async function requestAllLocations() {
    try {
        const url = domain + "loc";
        console.log("URL: \"" + url + "\"");
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text(); 
            throw new Error("Error occured requesting all locations: " + errorText);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function requestLocation(id) {
    try {
        const url = domain + "loc/" + id;
        console.log("URL: \"" + url + "\"");
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text(); 
            throw new Error("Error occured requesting locations{" + id + "}: " + errorText);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateLocation(id, location) {
    try {
        const response = await fetch(domain + "loc/" + id, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
          });
        if (response.ok) {
            return await response.text();
        } else {
            const errorText = await response.text(); 
            throw new Error("PUT location{" + id + "} not successful: " + errorText);
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteLocation(id) {
    try {
        const response = await fetch(domain + "loc/" + id, {
            method: 'DELETE'
          });
        if (response.ok) {
            return await response.text();
        } else {
            const errorText = await response.text(); 
            throw new Error("DELETE location{" + id + "} failed: " + errorText);
        }
    } catch (error) {
        throw error;
    }
}