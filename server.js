const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || '3000';

const app = express();
const routes = require('./src/routes');

// middleware
app.use(bodyParser.json());

app.use(cors())

// routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
});
