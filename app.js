const express = require('express');
const cors = require('cors');
const routes = require('./routes/indexRoute');
const passport = require('passport');
const StrategyJwt = require('./authentication/jwtStrategy');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(StrategyJwt);

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));