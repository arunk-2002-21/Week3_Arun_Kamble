import express, {Request, Response}  from "express";
import axios from "axios";
import sequelize from "./pgConfig";
import { Weather } from "./weatherModel";
import { getWeather } from "./service";
import dotenv from 'dotenv';
dotenv.config();
const nodemailer = require("nodemailer");

const app = express();
const port = 8080;

const geoApiKey = process.env.GEO_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

interface CityInfo{
    city: string;
    country: string;
} 

app.use(express.json());

app.post('/api/SaveWeatherMapping', async (req, res) => {
    const cities: CityInfo[] = req.body;

    try{
        for(const cityInfo of cities){
            // Get Coordinates
            const geoResponse = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${cityInfo.city}&country=${cityInfo.country}`,{
                headers: { 'X-Api-Key' : geoApiKey},
            });

            const coordinates = geoResponse.data[0];
            const {latitude, longitude} = coordinates;

            // Get Weather
            const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`);
            
            const weatherData = weatherResponse.data;
            const weather = weatherData.current.condition.text;

            // Save to database
            await Weather.create({    
                city: cityInfo.city,
                country: cityInfo.country,
                weather,
                time: new Date(),
                longitude,
                latitude,
            });

        }
        res.status(200).send({ message: 'Weather data saved successfully!'});
    } catch(error){
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving weather data.'})
    }
});

// Function to get Weather 
app.get('/api/weatherDashboard', async(req,res) => {
    try{
        const city = req.query.city as string;
        const weatherData = await getWeather(city);
        res.json(weatherData);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

// Function to mail the data from database
app.get('/mailingApi', async (req, res) => {
    try{
        let transporter = nodemailer.createTransport({
            service: 'ethereal',
            port:587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
        let info = await transporter.sendMail({
            from:'"Martin" <martin@gmail.com>',
            to:'martinluther72000@gmail.com',
            subject: 'Data From Database',
            text:'This is just to send data about weather',
            html:'<b>Weather Fetching<b>'
        })
        console.log(info.messageId)
        res.send(info)
    }
    catch(err){
        console.log(err)
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

