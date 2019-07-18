const { getMessages } = require("../repositories/message.repository");

const getMessageById = (id) => {
    const messages = getMessages();
    if (messages) {
      return messages.find(message => message.id === id);
    } else {
      return false;
    }
  }
  
  module.exports = {
    getMessageById,
};