/* repositories/user.repository.js */

const path = require('path');

const fs = require('fs');

const filename = path.normalize("./data/userlist.json");

let usersJSON = fs.readFileSync(filename);
let users = JSON.parse(usersJSON);

const saveUser = (data) => {
    if (data) {
      data.id = String(new Date().getTime()); 
      users.push(data);
      rewriteFile();
      return true;
    } else {
      return false;
    }
};

const deleteUser = (id) => {
  if (id) {
    const user = users.find(user => user.id === id)
    const userId = users.indexOf(user);
    users.splice(userId , 1);
    rewriteFile();
    return true;
  } else {
    return false;
  }
};

const modifyUser = (id, data) => {
  if (id) {
    const user = users.find(user => user.id === id)
    const userId = users.indexOf(user);
    users[userId] = data;
    rewriteFile();
    return true;
  } else {
    return false;
  }
}

const getUsers = () => {
  if (users) {
    console.log(filename);
    return users; 
  } else {
    return false;
  }
};

const rewriteFile = () => {
  fs.writeFileSync(filename, JSON.stringify(users, null, 2));
  usersJSON = fs.readFileSync(filename);
  users = JSON.parse(usersJSON);
  console.log(users);
}
  
  module.exports = {
    saveUser,
    getUsers,
    deleteUser,
    modifyUser
  };