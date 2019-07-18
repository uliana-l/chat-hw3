const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport.config');


const { getMessages, saveMessage, deleteMessage, modifyMessage } = require("../repositories/message.repository");
const { getMessageById } = require("../services/message.service");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const result = getMessages();
  console.log(result);
  if (result) res.send(result);
  else res.status(404).send('There are not any messages');
});

router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const id = req.params.id;                   
  const result = getMessageById(id);
  if (result) res.send(result);
  else res.status(400).send(`No message with id = ${id}`);
});

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const result = saveMessage(req.body);       
  res.send(result);
  if (result) res.send(`Message №${req.body.id} was added successfully`);
  else res.status(400).send(`Invalid data`);
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const id = req.params.id;
  const result = deleteMessage(id);
  if (result) res.send(`Message №${id} was deleted successfully`);
  else res.status(400).send(`No message with id = ${id}`);
});

router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const id = req.params.id;                   
  const result = modifyMessage(id, req.body);
  if (result) res.send(`Message №${id} was modified successfully`);
  else res.status(400).send(`No message with id = ${id}`);
});

module.exports = router;