const express = require('express');
const path = require('path');
const fs = require('fs');

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

app.listen(port, () => console.log('response'))