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
  heard: Boolean,
});

const Fav = mongoose.model('Fav', favSchema);

app.get('/fav', (req, res) => {
  Fav.find({}).then((results) => {
    console.log(results, 'results form get');
    res.send(JSON.stringify(results));
  });
});

app.get('/wordsHeard', (req, res) => {
  Fav.find({ heard: true }).then((results) => {
    console.log(results, 'results in wordsHeard');
    res.send(JSON.stringify(results));
  });
});

app.post('/postFav', (req, res) => {
  console.log(req.body.data, 'data has been posted to DB');
  const fav = new Fav({
    synonym: req.body.data,
    heard: false,
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

app.post('/update', (req, res) => {
  console.log(req.body.synonym);
  const value1 = req.body.synonym;
  const value2 = req.body.heard;
  Fav.findOneAndUpdate({ synonym: value1 }, { heard: value2 },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log('successful find and UPDATE!');
        res.send(result);
      }
    });
});

// app.get('/', (req, res) => res.sendFile(`${root}/index.html`));
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
