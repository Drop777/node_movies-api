const moviesModel = require('../models/movies-model');
const { handleApiError, handleModelError } = require('../utils/error-handler');

module.exports = {
  get(req, res) {
    moviesModel.getMovies()
      .catch(handleModelError)
      .then((movies) => res.send(movies))
      .catch(handleApiError(res));
  },
  getById(req, res) {
    moviesModel.getMoviesById(req.params.id)
      .catch(handleModelError)
      .then((movie) => {
        if (!movie) {
          const apiError = {
            statusCode: 404,
            errorMessage: 'Not Found',
          };

          throw apiError;
        }

        res.send(movie);
      })
      .catch(handleApiError(res));
  },
  getTitles(req, res) {
    moviesModel.getMoviesTitle(req.query.year)
      .catch(handleModelError)
      .then((titles) => res.send(titles))
      .catch(handleApiError(res));
  },
  postMovie(req, res) {
    moviesModel.postMovie(req.body)
      .catch(handleModelError)
      .then((newMovie) => res.json(newMovie))
      .catch(handleApiError(res));
  },
  putMovie(req, res) {
    moviesModel.putMovie(req.params.id, req.body)
      .catch(handleModelError)
      .then((newData) => res.send(newData))
      .catch(handleApiError(res));
  },
  patchMovie(req, res) {
    moviesModel.patchMovie(req.params.id, req.body)
      .catch(handleModelError)
      .then((newData) => res.send(newData))
      .catch(handleApiError(res));
  },
  deleteMovie(req, res) {
    moviesModel.deleteMovie(req.params.id)
      .catch(handleModelError)
      .then(() => res.statusCode(204))
      .catch(handleApiError(res));
  },
};
