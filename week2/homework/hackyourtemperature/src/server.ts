// usage: npm run start
// (starts auto compile typeScript and auto runs server)

import express = require('express');
import exphbs = require('express-handlebars');

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: undefined }));

app.get('/', (req, res) => {
  res.render('index');
});
app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  res.status(200);
  res.type('application/json');
  res.end(JSON.stringify({ cityName }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  process.stdout.write(`Server started on port ${PORT}\n`);
});
