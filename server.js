require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
