import { Sequelize } from "sequelize";
import { Weather } from "./weatherModel";

const sequelize = new Sequelize({
    username: 'postgres',
    host: 'localhost',
    database: "TestOrder",
    password: "sqlpg24",
    port: 5432,
    dialect: "postgres",
});

sequelize.authenticate()
    .then(() => {
        console.log("Database Connection established successfully");
    })
    .catch(() => {
        console.log("Unable to connect to database");
    });

sequelize.sync()
    .then(() => {
        console.log("Models synchronized with the database.");
    })
    .catch(() => {
        console.log("Unable to synchronize models with the database.");
    });  

const WeatherModel: any = {};
WeatherModel.sequelize = sequelize;
WeatherModel.Weather = Weather;

export default { sequelize, WeatherModel };