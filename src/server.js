const express = require('express');
const moviesRouter = require('./routers/movies-router');

const app = express();
const port = process.env.PORT || 4000;

app.use('/movies', moviesRouter);

app.listen(port, () => console.log(`${port}`));
