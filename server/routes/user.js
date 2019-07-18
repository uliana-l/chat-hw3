/* routes/user.js */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getUsers, saveUser, deleteUser, modifyUser } = require("../repositories/user.repository");
const { getUserById } = require("../services/user.service");

require('../passport.config');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const result = getUsers();
  if (result) res.send(result);
  else res.status(404).send('There are not any users');
});

router.get('/amount', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const result = getUsers().length;
  if (result) res.send({result});
  else res.status(404).send('There are not any users');
});


router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const id = req.params.id;                   
  const result = getUserById(id);
  if (result) res.send(result);
  else res.status(400).send(`No user with id = ${id}`);
});


router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const result = saveUser(req.body);       
  if (result) res.send(`User №${req.body.id} was added successfully`);
  else res.status(400).send(`Invalid data`);
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const id = req.params.id;
  const result = deleteUser(id);
  if (result) res.send(`User №${id} was deleted successfully`);
  else res.status(400).send(`No user with id = ${id}`);
});

router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) { 
  const id = req.params.id;                   
  const result = modifyUser(id, req.body);
  if (result) res.send(`User №${id} was modified successfully`);
  else res.status(400).send(`No user with id = ${id}`);
});

module.exports = router;