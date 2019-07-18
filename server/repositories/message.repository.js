const path = require('path');

const fs = require('fs');

const filename = path.normalize("./data/messagelist.json");

let messagesJSON = fs.readFileSync(filename);
let messages = JSON.parse(messagesJSON);

const saveMessage = (data) => {
    if (data) {
      messages.push(data);
      rewriteFile();
      return true;
    } else { 
      return false;
    }
};

const deleteMessage = (id) => {
  if (id) {
    const message = messages.find(message => message.id === id)
    const messageId = messages.indexOf(message);
    messages.splice(messageId , 1);
    rewriteFile();
    return true;
  } else {
    return false;
  }
};

const modifyMessage = (id, data) => {
  if (id) {
    const message = messages.find(message => message.id === id)
    const messageId = messages.indexOf(message);
    messages[messageId] = data;
    rewriteFile();
    return true;
  } else {
    return false;
  }
}

const getMessages = () => {
  if (messages) {
    console.log(filename);
    return messages; 
  } else {
    return false;
  }
};

const rewriteFile = () => {
  fs.writeFileSync(filename, JSON.stringify(messages, null, 2));
  messagesJSON = fs.readFileSync(filename);
  messages = JSON.parse(messagesJSON);
  console.log(messages);
}
  
  module.exports = {
    saveMessage,
    getMessages,
    deleteMessage,
    modifyMessage
  };