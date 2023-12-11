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

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParsers());

mongoose.connect('mongodb://127.0.0.1:27017/travelMateDB');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
};

app.use("/auth", authRoutes);

app.get('/api/user-details', authenticateToken, (req, res) => {
    // The authenticated user's details are available in req.user
    const userDetails = {
        id: req.user._id,
        username: req.user.username,
        // Add any other relevant user details
    };

    res.json(userDetails);
});

app.listen(port, (req, res) => {
    console.log(`Server up and running on port ${port}`)
});
