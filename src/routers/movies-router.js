const express = require('express');
const moviesController = require('../controllers/movies-controller');

const router = express.Router();

router.route('/')
  .get(moviesController.get)
  .post(express.json(), moviesController.postMovie);

router.route('/titles')
  .get(moviesController.getTitles);

router.route('/:id')
  .get(moviesController.getById)
  .put(express.json(), moviesController.putMovie)
  .patch(express.json(), moviesController.patchMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;
