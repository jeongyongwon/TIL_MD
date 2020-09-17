var express = require('express');
var User = require('../models').User;
var router = express.Router();

router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function(req, res, next) {
  User.create({
    name: req.body.name, //  req.body는 프론트엔드 측에서 받아온 정보
    age: req.body.age,
    married: req.body.married,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result); // http status 201: Created
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;