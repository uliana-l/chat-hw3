var express = require('express');
var router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

const fs = require('fs');

const filename = path.normalize("./data/userlist.json");

let usersJSON = fs.readFileSync(filename);
let users = JSON.parse(usersJSON);


router.post('/', function(req, res, next) {
    const userFromReq = req.body;
    const userInDB = users.find(user => user.name === userFromReq.login);
    if (userInDB && userInDB.password === userFromReq.password) {
      const token = jwt.sign(userFromReq, 'someSecret');
      res.status(200).json({ auth: true, user: token, login: userInDB.id });
    } else {
      res.status(401).json({ auth: false });
    }
});

module.exports = router;