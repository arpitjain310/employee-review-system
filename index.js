const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

//to use env file
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const db = require('./config/mongoose');

// middlewares to use json payload , url payload and session
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));

// setting view engine to ejs
app.set('view engine', 'ejs');

// Serve static files with the correct MIME type
app.use('/assets', express.static(path.join(__dirname, 'assets'), { 
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// importing Routes
const routes = require('./routes/appRoutes');

//routes redirection
app.use(routes);

//print server status
app.listen(port, function(err) {
  if (err) {
    console.log('Error in running the server', err);
  }
  console.log('Yup! My Server is running on Port', port);
});
