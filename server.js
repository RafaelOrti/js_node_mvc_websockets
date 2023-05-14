const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(require('./router'));

db.then(() => app.listen(PORT, () => console.log(`Server on port ${PORT}`)))
  .catch((err) => console.log(err.message));