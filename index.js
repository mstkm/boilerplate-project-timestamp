// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  let date = req.params.date;
  if (!date) {
    date = new Date();
  }
  let unix;
  let utc;
  if (isNaN(date)) {
    unix = new Date(date).getTime();
    utc = new Date(date).toUTCString();
  } else {
    unix = new Date(Number(date)).getTime();
    utc = new Date(Number(date)).toUTCString();
  }
  res.json({ "unix": unix, "utc": utc });
});

// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  const host = 'localhost'; // Ganti jika menggunakan domain
  const fullUrl = `http://${host}:${port}`;
  console.log(`Server running at ${fullUrl}`);
  console.log('Your app is listening on port ' + listener.address().port);
});
