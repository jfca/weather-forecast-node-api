const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const OWFURI = config.get('OWFURI');
const openweatherAPIkey = config.get('openweatherAPIkey');

const FiveDayForecast = require('../models/FiveDayForecast');

const getForecastFromOpenWeather = async id => {
    try {
        const URL = `${OWFURI}id=${id}&${openweatherAPIkey}`;
        console.log(URL);
        const res = await axios.get(URL);
        return res.data;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
};

// Get forecast weather information for specified id
const get5DayForecast = async id => {
    console.log('get5DayForecast');
    try {
        let forecast = await FiveDayForecast.findOne({ "city.id": id });

        console.log('id: ' + id);
        if (!forecast) {
            console.log('Not forecast');
            const forecast_json = await getForecastFromOpenWeather(id);
            forecast = new FiveDayForecast(forecast_json);
            await forecast.save();
            return forecast;
        }

        const currentTime = Date.now();
        const {created} = forecast;
        const createdTime = created.getTime();
        const time_diff = 60 * 60000;
        if ((currentTime > (createdTime + time_diff))) {
            console.log('(currentTime > (createdTime + time_diff))');
            const forecast_json = getForecastFromOpenWeather(id);
            forecast = await FiveDayForecast.replaceOne(
                {id: id},
                {...forecast_json, validUntil: Date.now()}
            );
            return forecast;
        } else {
            console.log('(currentTime < (createdTime + time_diff))');
            return forecast;
        }
    } catch (e) {
        console.error(e.message);
        throw e
    }
};

// @route   GET api/weather/5dayforecast/:id
// @desc    get 5 day forecast by id
// @access  private
router.get('/:id', async (req, res) => {
    try {
        const result = await get5DayForecast(req.params.id);
        await res.json(result);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;