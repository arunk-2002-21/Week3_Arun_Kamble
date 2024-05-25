import express  from "express";
import { Weather } from "./weatherModel";

// Create
async function createWeather(weather: Weather): Promise<any> {
   try{
        const newWeather = await Weather.create(weather);
        if(newWeather){
            return newWeather;
        }
   }
   catch(err: any){
    throw err.message;
   }
}

// Read
async function getWeather(city?: string): Promise<any[]> {
    
    if(city){
        return await Weather.findAll({
            where: {city: city},
            order: [['time', 'DESC']]
        })
    }
    else{
        return await Weather.findAll({
            order: [['time', 'DESC']]
        });
    }
}

export { createWeather, getWeather };