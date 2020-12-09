// usage: npm run start
// (starts auto compile typeScript and auto runs server)

import express = require('express');
import exphbs = require('express-handlebars');

const fetch = require('node-fetch');

const { API_KEY } = require('../sources/keys.json');

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: undefined }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', async (req, res) => {
  try {
    let { cityName } = req.body;
    let cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    cityData = await cityData.json();
    const weatherData = { weatherText: `City '${cityName}' is not found` };
    cityName = cityData?.name;
    if (cityName) {
      const { temp } = cityData.main;
      const tempString = temp ? `${temp}℃` : 'unknown';
      weatherData.weatherText = `The weather in ${cityName} is ${tempString}.`;
    }
    res.render('index', weatherData);
  } catch (err) {
    res.render('index', { weatherText: `There was an error in retrieving weather data: ${err.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  process.stdout.write(`Server started on port ${PORT}\n`);
});
