const express = require('express');
const router = express.Router();
const weatherData = require('../data/weather.json');
const Forecast = require('../models/forecast.js');

router.get('/weather', (req, res, next) => {
  console.log('Incoming query:', req.query);

  const city = weatherData.find(data => {
    const dataSearch = (data.city_name || '').toLowerCase();
    const querySearch = (req.query.searchQuery || '').toLowerCase();

    console.log('Data:', data.lat, data.lon, dataSearch);
    console.log('Query:', req.query.lat, req.query.lon, querySearch);

    return (
      Number(data.lat) === Number(req.query.lat) &&
      Number(data.lon) === Number(req.query.lon) &&
      dataSearch === querySearch
    );
  });

  console.log('City found:', city);

  if (!city) {
    const err = new Error(
      `City not found for lat=${req.query.lat}, lon=${req.query.lon}, searchQuery=${req.query.searchQuery}`
    );
    err.status = 404;
    return next(err);
  }

  const forecastData = city.data.map(day => {
    return new Forecast(day.datetime, day.weather.description);
  });

  res.json(forecastData);
});

module.exports = router;
