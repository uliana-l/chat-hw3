/* services/user.service.js */
const { getUsers } = require("../repositories/user.repository");

const getUserById = (id) => {
  const users = getUsers();
  if (users) {
    return users.find(user => user.id === id);
  } else {
    return false;
  }
}

module.exports = {
  getUserById,
};