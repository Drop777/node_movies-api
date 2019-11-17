const express = require('express');
const moviesRouter = require('./routers/movies-router');

const app = express();
const port = process.env.PORT || 4000;

app.use('/movies', moviesRouter);

app.listen(port, () => console.log(`${port}`));

// app.get('/movies', (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const sortedMovies = JSON.parse(data)
//         .sort((a, b) => +(a.year) - +(b.year));
//       res.json(sortedMovies);
//     }
//   });
// });

// app.get('/movies/titles', (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else if (req.query.year) {
//       const moviesTitilesByYear = JSON.parse(data).filter((item) => req.query.year === item.year);
//       if (moviesTitilesByYear.length === 0) {
//         res.sendStatus(404);
//       } else {
//         res.json({
//           status: 'OK',
//           moviesTitilesByYear,
//         });
//       }
//     } else {
//       const moviesTitle = JSON.parse(data).map((item) => item.title).sort().join('\n');
//       res.send(moviesTitle);
//     }
//   });
// });

// app.get('/movies/:id', (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const movie = JSON.parse(data).find((item) => req.params.id === item.id);
//       if (!movie) {
//         res.status(404).json({ error: 'movie no found' });
//       } else {
//         res.json({
//           status: 'OK',
//           movie,
//         });
//       }
//     }
//   });
// });

// app.get('/', (req, res) => {
//   res.send('hi from main page');
// });

// app.post('/movies', express.json(), (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const { title, imdbRating, year } = req.body;
//       const newMovie = {
//         imdbRating,
//         title,
//         year,
//         id,
//       };

//       const moviesListWithNewMovie = [...JSON.parse(data), newMovie];

//       fs.writeFile(JSON_PATH, JSON.stringify(moviesListWithNewMovie), (err) => {
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.json(newMovie);
//         }
//       });
//     }
//   });
// });

// app.put('/movies/:id', express.json(), (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const { title, imdbRating, year } = req.body;
//       const newDataForMovie = {
//         title,
//         imdbRating,
//         year,
//         id: req.params.id,
//       };

//       const editedMovie = JSON.parse(data).map((movie) => (movie.id === req.params.id
//         ? {
//           ...movie,
//           title,
//           imdbRating,
//           year,
//         }
//         : movie));

//       fs.writeFile(JSON_PATH, JSON.stringify(editedMovie), (err) => {
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.json(newDataForMovie);
//         }
//       });
//     }
//   });
// });

// app.patch('/movies/:id', express.json(), (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const newDataForMovie = {
//         ...req.body,
//         id: req.params.id,
//       };

//       const editedMovie = JSON.parse(data).map((movie) => (movie.id === req.params.id
//         ? {
//           ...movie,
//           ...newDataForMovie,
//         }
//         : movie));

//       fs.writeFile(JSON_PATH, JSON.stringify(editedMovie), (err) => {
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.json(newDataForMovie);
//         }
//       });
//     }
//   });
// });

// app.delete('/movies/:id', express.json(), (req, res) => {
//   fs.readFile(JSON_PATH, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       const newMoviesList = JSON.parse(data).filter((movie) => movie.id !== req.params.id);

//       fs.writeFile(JSON_PATH, JSON.stringify(newMoviesList), (err) => {
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(204);
//         }
//       });
//     }
//   });
// });


// app.listen(port, () => console.log('response'));
