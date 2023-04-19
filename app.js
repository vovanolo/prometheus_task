const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

const counter = new promClient.Counter({
  name: 'counter',
  help: 'This is a counter'
});

const gauge = new promClient.Gauge({
  name: 'gauge',
  help: 'This is a gauge'
});

const histogram = new promClient.Histogram({
  name: 'histogram',
  help: 'This is a histogram',
  buckets: [0.1, 0.5, 1, 2.5, 5, 10]
});

app.get('/', (req, res) => {
  counter.inc();
  gauge.set(Math.random());
  histogram.observe(Math.random() * 10);

  res.send('Monitoring');
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
