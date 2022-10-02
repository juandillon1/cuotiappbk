const express = require('express');
const personasRoute = require('./routes/personasRoute');
// const bancosRoute = require('./routes/bancosRoute');
const cuotasRoute = require('./routes/cuotasRoute');

const apiRoute = express.Router();
apiRoute.get('/api/', (req, res) => {
    res.send('/api funcionando');
});
apiRoute.use(personasRoute);
// apiRoute.use(bancosRoute);
apiRoute.use(cuotasRoute);

module.exports = apiRoute;