require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');
app.use(cors());

mongoose
  .connect('mongodb://localhost/mvp-demo-2020')
  .then(() => {
    console.log('Connected to the database!!');
  })
  .catch((err) => {
    console.error('Error connecting to the DB:', err);
  });

const favSchema = new Schema({
  synonym: String,
});

const Fav = mongoose.model('Fav', favSchema);

app.get('/fav', (req, res) => {
  res.send('GET data from DB');
});

app.post('/', (req, res) => {
  const fav = new Fav({
    synonym: word,
  });
  fav.save();
  res.statusCode = 201;
  res.json('test');
});

// app.get('/', (req, res) => res.sendFile(`${root}/index.html`));
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
