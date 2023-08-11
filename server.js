const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', weatherRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong.'
  });
});

const weatherFilePath = path.join(__dirname, 'data', 'weather.json');

app.locals.weatherData = require(weatherFilePath);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
