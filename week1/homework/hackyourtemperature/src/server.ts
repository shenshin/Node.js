/*
1. Create a JavaScript file called server.js (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a package.json file by running npm init -y
3. Install and load in the necessary modules for this project: they are express
(our web server), express-handlebars (our templating engine) and axios
4. Set up your web server using Express (creating an Express instance, listen to port 3000)
5. Make a GET request to / that sends the message hello from backend to frontend! to the client

After writing all this code you can verify that it's working by running node server.js from the Command Line and checking your browser at http://localhost:3000. The page should display the message hello from backend to frontend!.
*/

// usage: npm run start
// (starts auto compile typeScript and auto runs server)

const express = require('express');
// const path = require('path');
// const exphbs = require('express-handlebars');
const app = express();

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
