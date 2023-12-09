require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParsers = require('cookie-parser');

const app = express();
const port = 3000;
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({ origin: allowedOrigins}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParsers());

mongoose.connect('mongodb://127.0.0.1:27017/travelMateDB');

app.use("/auth", authRoutes);

app.listen(port, (req,res) => {
    console.log(`Server up and running on port ${port}`)
});
