const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const uuid = require('uuid/v4');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const id = uuid();
const JSON_PATH = path.join(__dirname, '../../data.json');

class MoviesModel {
  constructor(jsonPath = JSON_PATH) {
    this.jsonPath = jsonPath;
  }

  async getMovies() {
    const filecontent = await readFile(this.jsonPath);

    return JSON.parse(filecontent)
      .sort((a, b) => +(a.year) - +(b.year));
  }

  async getMoviesById(movieId) {
    const filecontent = await readFile(this.jsonPath);

    return JSON.parse(filecontent).find((movie) => movieId === movie.id);
  }

  async getMoviesTitle(year) {
    const filecontent = await readFile(this.jsonPath);

    if (year) {
      return JSON.parse(filecontent).filter((movie) => year === movie.year).map((movie) => movie.title).sort()
        .join('\n');
    }

    return JSON.parse(filecontent).map((movie) => movie.title).sort().join('\n');
  }

  async postMovie(movieData) {
    const filecontent = await readFile(this.jsonPath);

    const { title, imdbRating, year } = movieData;
    const newMovie = {
      imdbRating,
      title,
      year,
      id,
    };
    const moviesListWithNewMovie = [...JSON.parse(filecontent), newMovie];

    await writeFile(this.jsonPath, JSON.stringify(moviesListWithNewMovie, null, 2));

    return newMovie;
  }

  async putMovie(movieId, movieData) {
    const filecontent = await readFile(this.jsonPath);
    const { title, imdbRating, year } = movieData;
    const newDataForMovie = {
      title,
      imdbRating,
      year,
      id: movieId,
    };
    const editedMovie = JSON.parse(filecontent).map((movie) => (movie.id === movieId
      ? {
        ...movie,
        title,
        imdbRating,
        year,
      }
      : movie));

    await writeFile(this.jsonPath, JSON.stringify(editedMovie, null, 2));

    return newDataForMovie;
  }

  async patchMovie(movieId, movieData) {
    const filecontent = await readFile(this.jsonPath);
    const newDataForMovie = {
      ...movieData,
      id: movieId,
    };

    const editedMovie = JSON.parse(filecontent).map((movie) => (movie.id === movieId
      ? {
        ...movie,
        ...newDataForMovie,
      }
      : movie));

    await writeFile(this.jsonPath, JSON.stringify(editedMovie, null, 2));

    return newDataForMovie;
  }

  async deleteMovie(movieId) {
    const filecontent = await readFile(this.jsonPath);
    const newMoviesList = JSON.parse(filecontent).filter((movie) => movie.id !== movieId);
    await writeFile(this.jsonPath, JSON.stringify(newMoviesList, null, 2));
    return movieId;
  }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;
