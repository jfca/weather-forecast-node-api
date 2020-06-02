const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const OWMURI = config.get('OWMURI');
const openweatherAPIkey = config.get('openweatherAPIkey');

const CurrentWeather = require('../models/CurrentWeather');

const getCurrentFromOpenWeather = async id => {
    console.log('getCurrentFromOpenWeather');

    try {
        const URL = `${OWMURI}id=${id}&${openweatherAPIkey}`;
        console.log(URL);
        const res = await axios.get(URL);
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
};

// Get current weather information for specified is
const getCurrentWeather = async (id) => {
    console.log('getCurrentWeather');
    try {
        console.log(`city id: ${id}`);
        let current = await CurrentWeather.findOne({ id: id });

        if (!current) {
            console.log('Not current');
            const current_json = await getCurrentFromOpenWeather(id);
            current = new CurrentWeather(current_json);
            await current.save();
            return current.json();
        }

        const currentTime = Date.now();
        const { created } = current;
        const createdTime = Date.parse(created);
        const time_diff = 60 * 60000; // 1 hour
        console.log(`currentTime: ${currentTime}`);
        console.log(new Date(currentTime));
        console.log(`createdTime: ${createdTime}`);
        console.log(new Date(createdTime));
        console.log(`createdTime + time_diff: ${(createdTime + time_diff)}`);
        if (currentTime > (createdTime + time_diff)) {
            console.log('(currentTime > (createdTime + time_diff))');
            const current_json = await getCurrentFromOpenWeather(id);
            current = await CurrentWeather.findOneAndReplace(
                { id: id },
                { ...current_json, created: Date.now() },
                { returnNewDocument: true }
            );

            return current;
        } else {
            console.log('(currentTime < (createdTime + time_diff))');
            return current;
        }
    } catch (e) {
        console.error(e.message);
        throw e
    }
};

// @route   GET api/weather/current/:id
// @desc    get current weather information by id
// @access  private
router.get('/:id', async (req, res) => {
    console.log('GET api/weather/current/:id');
    try {
        const result = await getCurrentWeather(req.params.id);
        await res.json(result);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;