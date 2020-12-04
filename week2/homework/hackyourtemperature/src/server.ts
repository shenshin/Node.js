// usage: npm run start
// (starts auto compile typeScript and auto runs server)

const express = require('express');
// const path = require('path');
/* const exphbs = require('express-handlebars'); */
const app = express();
/* app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false })); */

app.get('/', (req: any, res: any) => {
  res.send('hello from backend to frontend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err: any) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server started on port ${PORT}`);
});
