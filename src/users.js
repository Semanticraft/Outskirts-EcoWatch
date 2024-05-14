const userList = new Map([]);

function addUser(username, password, role, name) {
    userList.set(username, [password, role, name]);
}

addUser('admina', 'password', 'admin', 'Mina');
addUser('normalo', 'password', 'non-admin', 'Norman');

export {userList, addUser};