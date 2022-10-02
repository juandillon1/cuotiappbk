const express = require('express');
const app = express();
const routerIndex = express.Router();
const port = 3000;
const bodyParser = require('body-parser');
const { connectDB } = require('./middlewares/connectDB');
const apiRoute = require('./api');
// middlewares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(routerIndex);

// Check Connection
routerIndex.get('/', (req, res) => {
  res.send('API ALIVE!');
})
// Connect DB
connectDB();

// ROUTES

// Principal
app.use(apiRoute);

// CRUD



app.listen(port, () => {
    console.log('back connected and listening');
});