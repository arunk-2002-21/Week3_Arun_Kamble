"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const weatherModel_1 = require("./weatherModel");
const service_1 = require("./service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer = require("nodemailer");
const app = (0, express_1.default)();
const port = 8080;
const geoApiKey = process.env.GEO_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;
app.use(express_1.default.json());
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body;
    try {
        for (const cityInfo of cities) {
            // Get Coordinates
            const geoResponse = yield axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding?city=${cityInfo.city}&country=${cityInfo.country}`, {
                headers: { 'X-Api-Key': geoApiKey },
            });
            const coordinates = geoResponse.data[0];
            const { latitude, longitude } = coordinates;
            // Get Weather
            const weatherResponse = yield axios_1.default.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`);
            const weatherData = weatherResponse.data;
            const weather = weatherData.current.condition.text;
            // Save to database
            yield weatherModel_1.Weather.create({
                city: cityInfo.city,
                country: cityInfo.country,
                weather,
                time: new Date(),
                longitude,
                latitude,
            });
        }
        res.status(200).send({ message: 'Weather data saved successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving weather data.' });
    }
}));
// Function to get Weather 
app.get('/api/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        const weatherData = yield (0, service_1.getWeather)(city);
        res.json(weatherData);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
// Function to mail the data from database
app.get('/mailingApi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer.createTransport({
            service: 'ethereal',
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
        let info = yield transporter.sendMail({
            from: '"Martin" <martin@gmail.com>',
            to: 'martinluther72000@gmail.com',
            subject: 'Data From Database',
            text: 'This is just to send data about weather',
            html: '<b>Weather Fetching<b>'
        });
        console.log(info.messageId);
        res.send(info);
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map