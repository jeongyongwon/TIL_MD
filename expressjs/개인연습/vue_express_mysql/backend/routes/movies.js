const express = require('express');
const router = express.Router();
const movies = require('../movies.json');


router.get('/', function (req, res, next) {
    res.send(movies)
   });

router.get('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    const movie = movies.filter(function (movie) {
    return movie.id === id
    });
    res.send(movie)
   });

module.exports = router;