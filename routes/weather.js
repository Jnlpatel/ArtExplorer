const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        // Default city or get from query params
        const city = req.query.city || 'Toronto';
        const weatherApiUrl = `https://goweather.herokuapp.com/weather/${encodeURIComponent(city)}`;
        
        const response = await axios.get(weatherApiUrl);
        const weatherData = response.data;
        
        res.render('weather', { 
            city,
            weather: weatherData,
            title: `Weather Forecast | Art Explorer`
        });
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).render('weather', { 
            error: 'Failed to fetch weather data',
            title: 'Weather Error | Art Explorer'
        });
    }
});

module.exports = router;