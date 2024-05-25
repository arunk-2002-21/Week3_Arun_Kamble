"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const weatherModel_1 = require("./weatherModel");
const sequelize = new sequelize_1.Sequelize({
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
const WeatherModel = {};
WeatherModel.sequelize = sequelize;
WeatherModel.Weather = weatherModel_1.Weather;
exports.default = { sequelize, WeatherModel };
//# sourceMappingURL=pgConfig.js.map