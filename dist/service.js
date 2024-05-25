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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = exports.createWeather = void 0;
const weatherModel_1 = require("./weatherModel");
// Create
function createWeather(weather) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newWeather = yield weatherModel_1.Weather.create(weather);
            if (newWeather) {
                return newWeather;
            }
        }
        catch (err) {
            throw err.message;
        }
    });
}
exports.createWeather = createWeather;
// Read
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        if (city) {
            return yield weatherModel_1.Weather.findAll({
                where: { city: city },
                order: [['time', 'DESC']]
            });
        }
        else {
            return yield weatherModel_1.Weather.findAll({
                order: [['time', 'DESC']]
            });
        }
    });
}
exports.getWeather = getWeather;
//# sourceMappingURL=service.js.map