const express = require('express');
const mongoose = require('mongoose');
const readdirSync = require('fs').readdirSync;
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());


// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3500;

app.use(express.json());  
app.use(cors())

app.use('/images', express.static('Recipes/coverImages'));


app.get('/', (req, res) => {
    res.send('API is working');
});
readdirSync('./routes').map((file) => {
    const routePath = `./routes/${file}`;
    app.use('/', require(routePath));
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });})
    .catch((err) => console.log(err));

