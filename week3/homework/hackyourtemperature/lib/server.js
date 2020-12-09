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
const express = require("express");
const exphbs = require("express-handlebars");
const fetch = require('node-fetch');
const { API_KEY } = require('../sources/keys.json');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: undefined }));
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cityName } = req.body;
    let cityData = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    cityData = yield cityData.json();
    cityName = cityData === null || cityData === void 0 ? void 0 : cityData.name;
    const weatherData = { weatherText: 'City is not found' };
    if (cityName) {
        const { temp } = cityData.main;
        const tempString = temp ? `${temp}℃` : 'unknown';
        weatherData.weatherText = `The weather in ${cityName} is ${tempString}.`;
    }
    res.render('index', weatherData);
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    process.stdout.write(`Server started on port ${PORT}\n`);
});
//# sourceMappingURL=server.js.map