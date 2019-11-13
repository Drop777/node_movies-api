const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const jsonParser = bodyParser.json();
const id = uuid();

const app = express();
const port = 4000;

const JSON_PATH = path.join(__dirname, '../data.json');

app.get('/movies', (req, res) => {
  fs.readFile(JSON_PATH, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const sortedMovies = JSON.parse(data)
        .sort((a, b) => +(a.year) - +(b.year));
      res.json(sortedMovies);
    }
  })
})

app.get('/movies/titles', (req, res) => {
  fs.readFile(JSON_PATH, (err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      if (req.query.year) {
        const moviesTitilesByYear = JSON.parse(data).filter(item => req.query.year === item.year);
        if (moviesTitilesByYear.length === 0) {
          res.sendStatus(404);
        } else {
          res.json({
            status: 'OK',
            moviesTitilesByYear,
          });
        }
      } else {
        const moviesTitle = JSON.parse(data).map(item => item.title).sort().join('\n');
        res.send(moviesTitle);
      }
    }
  })
})

app.get('/movies/:id', (req, res) => {
  fs.readFile(JSON_PATH, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const movie = JSON.parse(data).find(item => req.params.id === item.id);
      if (!movie) {
        res.status(404).json({ error: "movie no found" });
      } else {
        res.json({
          status: 'OK',
          movie,
        });
      }
    }
  })
})

app.get('/', (req, res) => {
  res.send("hi from main page");
})

app.post('/movies', jsonParser, (req, res) => {
  const { title, imdbRating, year } = req.body;
  const newMovie = {
    imdbRating,
    title,
    year,
    id: id,
  };
  const movies = JSON.parse(fs.readFileSync(JSON_PATH));
  dataWithNewFilm = [...movies, newMovie];
  fs.writeFile(JSON_PATH, JSON.stringify(dataWithNewFilm), (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(newMovie);
    }
  });
})

app.put('/movies/:id', jsonParser, (req, res) => {
  const { title, imdbRating, year } = req.body;
  const newDataForMovie = {
    title,
    imdbRating,
    year
  };
  const movieWithChange = JSON.parse(fs.readFileSync(JSON_PATH))
    .map(movie => {
      if (movie.id === req.params.id) {
        return ({
          ...movie,
          title,
          imdbRating,
          year,
        })
      }
      return movie;
    });
  fs.writeFile(JSON_PATH, JSON.stringify(movieWithChange), (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(newDataForMovie);
    }
  });
});

app.patch('/movies/:id', jsonParser, (req, res) => {
  const newDataForMovie = {
    ...req.body
  };
  const movieWithChange = JSON.parse(fs.readFileSync(JSON_PATH))
    .map(movie => {
      if (movie.id === req.params.id) {
        return ({
          ...movie,
          ...req.body,
        })
      }
      return movie;
    });
  fs.writeFile(JSON_PATH, JSON.stringify(movieWithChange), (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(newDataForMovie);
    }
  });
});

app.delete('/movies/:id', jsonParser, (req, res) => {
  const newMoviesList = JSON.parse(fs.readFileSync(JSON_PATH)).filter(movie => movie.id !== req.params.id);
  fs.writeFile(JSON_PATH, JSON.stringify(newMoviesList), (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  })
});


app.listen(port, () => console.log('response'))