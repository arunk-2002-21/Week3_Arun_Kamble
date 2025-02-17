"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("./pgConfig"));
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
Weather.init({
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weather: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: pgConfig_1.default.sequelize,
    tableName: 'weather',
    timestamps: false,
});
//# sourceMappingURL=weatherModel.js.map