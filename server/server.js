require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = process.env;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');
app.use(cors());
// app.use(express.json());
app.use(bodyParser());
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
  Fav.find({}).then((results) => {
    res.send(JSON.stringify(results));
  });
});

app.post('/postFav', (req, res) => {
  console.log(req.body.data, 'data has been posted to DB');
  const fav = new Fav({
    synonym: req.body.data,
  });

  fav.save();
  res.statusCode = 201;
  // res.json('test');
});
app.delete('/delete', (req, res) => {
  console.log(req.body, 'data has been posted to DB');

  Fav.deleteMany({}, (err) => {
    if (err) {
      res.statusCode(500);
      res.send('Could not delete favorites from DB');
    } else {
      res.status(200);
      res.send('Favorites deleted');
    }
  });
  // res.statusCode = 201;
  // res.json('test');
});

// app.get('/', (req, res) => res.sendFile(`${root}/index.html`));
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
