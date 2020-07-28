require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
const mongoose = require('mongoose');
// const root = require('root');

mongoose
  .connect('mongodb://localhost/mvp-demo-2020')
  .then(() => {
    console.log('Connected to the database!!');
  })
  .catch((err) => {
    console.error('Error connecting to the DB:', err);
  });

// app.get('/', (req, res) => res.sendFile(`${root}/index.html`));
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
