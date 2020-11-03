const path = require('path');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const csv = require('csv-parser')
const fs = require('fs')

app.use(
  '/',
  express.static(path.join(__dirname, 'public'))
);

app.get('/flights', function (req, res) {
  const flightResults = [];
  fs.createReadStream('flighdata_B/flighdata_B.csv')
  .pipe(csv())
  .on('data', (data) => flightResults.push(data))
  .on('end', () => {
    res.json(flightResults)
  });
})

app.get('/segments', function (req, res) {
  const segmentResults = [];
  fs.createReadStream('flighdata_B/flighdata_B_segments.csv')
  .pipe(csv())
  .on('data', (data) => segmentResults.push(data))
  .on('end', () => {
    res.json(segmentResults)
  });
})

app.listen(port, () => console.log(`Server started on port ${port}`));

